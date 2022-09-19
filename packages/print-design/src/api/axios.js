import axios from "axios";
import { showMessage } from "./status";
import { ElMessage, ElMessageBox } from 'element-plus';

// 设置接口超时时间
axios.defaults.timeout = 10000;
// 动态赋值的的环境变量
axios.defaults.baseURL = import.meta.env.VITE_API_ENV;
//http request 拦截器
axios.interceptors.request.use(
  config => {
  // 配置请求头
    config.headers = {
      'Content-Type':'application/json',         // 传参方式json
      'Account-Token': localStorage.getItem('accessToken') ?? '',
      'ClientVersion': '20220916-1',
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);           // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      ElMessage.warning('网络连接异常,请稍后再试!');
    }
  }
);

// 封装 GET POST 请求并导出
export function request({url = '', method = 'POST', params = {}, paramsKey = false}){
  //设置 url params method 的默认值
  return new Promise((resolve,reject)=>{
    let promise
    if( method.toUpperCase()==='GET' ){
      promise = axios({
        url,
        params
      })
    }else if( method.toUpperCase()=== 'POST' ){
      let key = 'data';
      if(paramsKey) {
        key = 'params';
      }
      promise = axios({
        method:'POST',
        url,
        [key]:params
      })
    }
    //处理返回
    promise.then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}