import { request } from './axios'

// 获取公司信息
export function GetCompanyInfo(params) {
  return request({
    url: '/api/BaseData/GetCompanyInfo',
    method: 'post',
    params
  });
}

// 获取单据信息
export function InvoiceDetail(params) {
  return request({
    url: '/api/DelegateExternalManage/GetDelegateExternalSendDetailByNo',
    method: 'post',
    params,
    paramsKey: true
  });
}

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