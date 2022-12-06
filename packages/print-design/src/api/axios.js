import axios from "axios";
import { showMessage } from "./status";
import { ElMessage } from 'element-plus';

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
          'Account-Token': localStorage.getItem('accessToken'),
        };

        return config;
      },

      error => Promise.reject(error)
    );

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
      this.instance.request(config).then((res) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

export default new HttpRequest(import.meta.env.VITE_API_ENV);