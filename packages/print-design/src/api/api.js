import { request } from './axios'

// 保存单据模板
export function SaveDocumentPrint(params) {
  return request({
    url: '/api/DocumentPrint/SaveDocumentPrint',
    method: 'post',
    params
  });
}

// 获取单据数据
export function GetDocumentPrintInfo(params) {
  return request({
    url: '/api/DocumentPrint/GetDocumentPrintInfo',
    method: 'post',
    params
  });
}

// 删除单据打印模板
export function RemoveDocumentPrint(params) {
  return request({
    url: '/api/DocumentPrint/RemoveDocumentPrint',
    method: 'post',
    params,
    paramsKey: true
  });
}

// 自定义接口
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