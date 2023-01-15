import { onMounted, onUnmounted } from 'vue';
import _ from 'lodash';

export default function useScalePage(options){
  const resizeFunc = _.throttle(function() {
    triggerRef();
  }, 100);
  
  onMounted(() => {
    triggerRef();
    window.addEventListener('resize', resizeFunc);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeFunc);
  })
  
  function triggerRef() {
    const targetX = options.targetX || 1920;
    const targetY = options.targetY || 1080;
    const targetRatio = options.targetRatio || 16 / 9;

    const currentX = document.documentElement.clientWidth || document.body.clientWidth;
    const currentY = document.documentElement.clientHeight || document.body.clientHeight;
    
    let scaleRatio = currentX / targetX; // 参照宽度进行缩放
    let currentRatio = currentX / currentY; // 宽高比例

    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY;
      // 超宽屏情况下居中展示
      document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio}) translateX(-50%); left: 50%;`
    } else {
      document.body.style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio});`
    }
  }
}