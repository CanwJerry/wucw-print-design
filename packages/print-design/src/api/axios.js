import axios from "axios";
import { showMessage } from "./status";
import { ElMessage } from 'element-plus';
import { showFullScreenLoading as showLoading, hideFullScreenLoading as hideLoading } from 'common/src/utils/serviceLoading';
import { updateToken } from './api.js';
import store from '@/store';

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

    let isRefreshToken = false;
    let refreshRequest = [];

    this.instance.interceptors.response.use(
      response => {
        return {
          data: response.data,
          status: response.status,
          msg: response.statusText
        }
      },

      error => {
        const { response } = error;
        if (response && response?.status !== 0) {
          if (response.data.code === 101) {
            if (!isRefreshToken) {
              isRefreshToken = true;
              const refreshToken = sessionStorage.getItem('refreshToken');
              return updateToken({ refreshToken }).then(data => {
                console.log(data);
                if (data.accessToken) {
                  refreshRequest.forEach(callback => {
                    callback(data.accessToken);
                  });
                  return service(response.config);
                } else {
                  // 刷新失败需要重新登录
                  // sessionStorage.removeItem('accessToken');
                  // sessionStorage.removeItem('refreshToken');
                  // location.reload();
                  return Promise.reject();
                }
              }).catch(err => {
                // 刷新失败需要重新登录
                // sessionStorage.removeItem('accessToken');
                // sessionStorage.removeItem('refreshToken');
                // location.reload();
              }).finally(() => {
                isRefreshToken = false;
              });
            } else {
              return new Promise(resolve => {
                // 将resolve放进队列，等token刷新后直接执行
                refreshRequest.push((token) => {
                  // 更新请求头
                  response.config.headers['Account-Token'] = token;
                  resolve(service(response.config));
                });
              });
            }
          }

          if(response.data.code === 102) {
            ElMessage.error(response.data.msg);
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            // location.reload();
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