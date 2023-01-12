// 限制按钮重复点击
const btnLimit = {
  mounted (el, binding) {
    if(el.type === 'button') {
      el.addEventListener('click', () => {
        el.disabled = true;
        el.id = binding.arg;
      })
    }
  },
}

// 清除按钮限制
const clearBtnLimit = function(ID) {
  try {
    setTimeout(() => {
      document.getElementById(ID).disabled = false;
      document.getElementById(ID).id = '';
    }, 500);
  }catch(err) {
    throw err;
  }
};

export { btnLimit, clearBtnLimit };