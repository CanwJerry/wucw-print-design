import http from './axios';

// 用户登录接口
export function userLogin(data) {
  return http.request({
    url: '/login',
    method: 'post',
    data
  });
}

// 用户注册接口
export function userRegist(data) {
  return http.request({
    url: '/regist',
    method: 'post',
    data
  });
}

// 验证token是否过期
export function checkToken() {
  return http.request({
    url: '/checkToken',
    method: 'post',
  });
}

// 用户更新信息接口
export function updateUserInfo(data) {
  return http.request({
    url: '/updateUserInfo',
    method: 'post',
    data
  });
}

// 用户更新密码接口
export function updateUserPassword(data) {
  return http.request({
    url: '/updateUserPassword',
    method: 'post',
    data
  });
}

// 保存单据模板
export function SaveDocumentPrint(data) {
  return http.request({
    url: '/document/save',
    method: 'post',
    data
  });
}

// 获取单据数据
export function GetDocumentPrintInfo(data) {
  return http.request({
    url: '/document/get',
    method: 'post',
    data
  });
}

// 删除单据打印模板
export function RemoveDocumentPrint(data) {
  return http.request({
    url: '/document/remove',
    method: 'post',
    data,
  });
}

// 自定义接口 get => params post => data
export function CustomApi(
  url, 
  params, 
  method, 
  paramsKey = false, 
  contentType = 'application/json'
) {
  return http.request({
    url,
    method,
    params,
    paramsKey,
    headers: {
      'Content-Type': contentType,
    },
  });
}