import { onMounted, onUnmounted, nextTick } from 'vue';
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
    const targetX = 1920;
    const targetY = 1080;
    const targetRatio = 16 / 9;

    const currentX = document.documentElement.clientWidth - 220; // 220 => padding + aside
    const currentY = document.documentElement.clientHeight - 220;
    
    let scaleRatio = currentX / targetX; // 参照宽度进行缩放
    let currentRatio = currentX / currentY; // 宽高比例

    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY;
      // 超宽屏情况下居中展示
      document.getElementById('power-screen').style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio}) translateX(-50%); left: 50%;`
    } else {
      document.getElementById('power-screen').style = `width:${targetX}px; height:${targetY}px; transform: scale(${scaleRatio});`
    }
  }
}