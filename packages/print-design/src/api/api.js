import { request } from './axios'

export function GetCompanyInfo(params) {
  return request({
    url: '/api/BaseData/GetCompanyInfo',
    method: 'post',
    params
  });
}

export function InvoiceDetail(params) {
  return request({
    url: '/api/DelegateExternalManage/GetDelegateExternalSendDetailByNo',
    method: 'post',
    params,
    paramsKey: true
  });
}