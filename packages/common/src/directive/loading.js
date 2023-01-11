import { createApp } from "vue";
import Loading from '../components/Wloading/index.vue';

const loadingDirective = {
  mounted (el, binding) {
    const app = createApp(Loading);

    // 动态创建⼀个div节点，将app挂载在div上
    // loading 组件将替换此 div 标签的 innerHTML
    const instance = app.mount(document.createElement('div'));

    // 因为在updated也需要⽤到 instance 所以将 instance 添加在 el 上
    // 在 updated中 通过el.instance 可访问到
    el.instance = instance;

    // v-loading传过来的值储存在 binding.value 中
    if(binding.value) {
      append(el);
    }

    // 判断是否有title值
    if(binding.arg !== 'undefined') {
      el.instance.setTitle(binding.arg);
    }
  },

  updated (el, binding) {
    // 判断是否有title值
    if(binding.arg !== 'undefined') {
      el.instance.setTitle(binding.arg);
    }

    if(binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  }
};

// w-relative 全局相对定位样式名称
// w-hidden 全局禁止/隐藏滚动样式名称
const relative = 'w-relative';
const hidden = 'w-hidden';

// 插入节点
function append(el) {
  const style = getComputedStyle(el);
  // 解决遮罩层后面的页面会发生滚动，滚动遮罩层时会造成底部页面跟着一块滚动问题
  el.classList.add(hidden);
  // 判断挂载的节点是否有定位
  if(['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
    el.classList.add(relative);
  }
  el.appendChild(el.instance.$el);
}

// 移除节点
function remove(el) {
  el.removeChild(el.instance.$el);
}

export default loadingDirective;