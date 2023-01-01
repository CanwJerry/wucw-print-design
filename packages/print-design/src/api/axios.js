import axios from "axios";
import { showMessage } from "./status";
import { ElMessage } from 'element-plus';
import { showFullScreenLoading as showLoading, hideFullScreenLoading as hideLoading } from 'common/src/utils/serviceLoading';
import { storeKey } from "vuex";

class HttpRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    });

    this.instance.interceptors.request.use(
      config => {
        config.headers = {
          'Content-Type':'application/json',
          'Account-Token': sessionStorage.getItem('accessToken'),
        };

        return config;
      },

      error => {
        return Promise.reject(error);
      }
    );
    
    //是否正在刷新Token
    let isRefreshToken = false;
    // 缓存请求队列
    let refreshRequest = [];

    this.instance.interceptors.response.use(
      response => {
        if(!isRefreshToken) {
          isRefreshToken = true;
          return storeKey.dispatch('user/refreshToken').then(data => {
            if (data.token) {
              sessionStorage.setItem('accessToken');
              // 更新请求头
              const params = response.config.params
              if (params && params.token) {
                params.token = data.token
              }
              refreshRequest.forEach(callback=>{
                callback(data.token)
              })
              return request(response.config)
            } else {
              // 刷新失败需要重新登录 
              sessionStorage.removeItem('accessToken');
              location.reload();
              return Promise.reject()
            }
          }).catch(() => {
            // 刷新失败需要重新登录 
            sessionStorage.removeItem('accessToken');
            location.reload();
          }).finally(() => {
            isRefreshToken=false
          })
        } else {
          // 缓存请求列表(利用Promise防止之前的请求返回错误的Token导致的错误信息)
          return new Promise((resolve) => {
            // 将resolve放进队列，等token刷新后直接执行
            refreshRequest.push((token) => {
              // 更新请求头
              response.config.headers['Account-Token'] = sessionStorage.getItem('accessToken')
              resolve(service(response.config));
            });
          });
        }

        // return {
        //   data: response.data,
        //   status: response.status,
        //   msg: response.statusText
        // }
      },

      error => {
        const { response } = error;
        if (response && response?.status !== 0) {
          if(response.data === 'token已失效') {
            ElMessage.error('token已失效, 请重新登录');
            sessionStorage.removeItem('accessToken');
            location.reload();
            return;
          }

          const msg = showMessage(response.status)
          ElMessage.error(response.data)
          
          const errorMsg = {
            data: response.data,
            status: response.status,
            msg: response.statusText
          }
          return Promise.resolve(errorMsg);
        } else {
          ElMessage.warning('网络连接异常,请稍后再试!');
        }
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      showLoading();
      this.instance.request(config).then((res) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      }).finally(() => {
        hideLoading();
      })
    })
  }
}

export default new HttpRequest(import.meta.env.VITE_API_ENV);