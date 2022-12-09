import { ElLoading } from 'element-plus'

let loading;

const startLoading = function() {
  loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    customClass: 'custom-loading',
    background: 'rgba(146, 200, 146, 0.2)',
    viewBox: '0 0 26 26'
  })
}

const endLoading = function() {
  loading.close();
}

let needLoadingRequestCount = 0;
export const showFullScreenLoading = function() {
  if(needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export const hideFullScreenLoading = function() {
  if(needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if(needLoadingRequestCount === 0) {
    endLoading();
  }
}