import axios from "axios";
import { showMessage } from "./status";
import { ElMessage, ElMessageBox } from 'element-plus';
import { showFullScreenLoading as showLoading, hideFullScreenLoading as hideLoading } from 'common/src/utils/serviceLoading';
import { updateToken } from './api.js';

class HttpRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    });

    this.instance.interceptors.request.use(
      config => {
        config.headers = Object.assign(config.headers, {
          'Content-Type':'application/json',
          'Account-Token': sessionStorage.getItem('accessToken'),
        })

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
              return updateToken({ refreshToken }).then(res => {
                const { data } = res;
                sessionStorage.setItem('accessToken', data.accessToken)
                if (data.accessToken) {
                  refreshRequest.forEach(callback => {
                    callback(data.accessToken);
                  });
                  return this.request(response.config);
                } else {
                  return Promise.reject();
                }
              }).catch(err => {
                return Promise.reject();
              }).finally(() => {
                isRefreshToken = false;
              });
            } else {
              return new Promise(resolve => {
                // ???resolve??????????????????token?????????????????????
                refreshRequest.push((token) => {
                  // ???????????????
                  response.config.headers['Account-Token'] = token;
                  resolve(this.request(response.config));
                });
              });
            }
          }

          if(response.data.code === 102) {
            ElMessageBox.confirm(
              response.data.msg,
              '????????????',
              {
                confirmButtonText: '????????????',
                closeOnclickModal: false,
                closeOnPressEscape: false,
                showCancelButton: false,
                showClose: false,
                type: 'warning',
              },
            ).then(() => {
              console.warn('???????????????');
              this.resetLogin();
            }).catch(() => {
              console.warn('??????');
            });
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
          ElMessage.warning('??????????????????,???????????????!');
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

  resetLogin() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    location.reload();
  }
}

export default new HttpRequest(import.meta.env.VITE_API_ENV);