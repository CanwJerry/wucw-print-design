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
  return request({
    url: '/regist',
    method: 'post',
    data
  });
}

// 用户更新信息接口
export function updateUserInfo(data) {
  return request({
    url: '/updateUserInfo',
    method: 'post',
    data
  });
}

// 保存单据模板
export function SaveDocumentPrint(data) {
  return request({
    url: '/api/DocumentPrint/SaveDocumentPrint',
    method: 'post',
    data
  });
}

// 获取单据数据
export function GetDocumentPrintInfo(data) {
  return request({
    url: '/api/DocumentPrint/GetDocumentPrintInfo',
    method: 'post',
    data
  });
}

// 删除单据打印模板
export function RemoveDocumentPrint(data) {
  return request({
    url: '/api/DocumentPrint/RemoveDocumentPrint',
    method: 'post',
    data,
    paramsKey: true
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
  return request({
    url,
    method,
    params,
    paramsKey,
    headers: {
      'Content-Type': contentType,
    },
  });
}