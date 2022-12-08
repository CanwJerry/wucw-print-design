<template>
  <div class="Wbackground" ref="wbackgroundRef">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Wbackground',
  };
</script>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as THREE from "three";
  import GLOBE from 'vanta/src/vanta.globe';

  const wbackgroundRef = ref(null);

  let vantaEffect = null;

  onMounted(() => {
    vantaEffect = GLOBE({
      el: wbackgroundRef.value,
      THREE: THREE,
      color: '#6f7f6f',
      backgroundColor: '#92c892',
    })
  })

  onBeforeUnmount(() => {
    if(vantaEffect) {
      vantaEffect.destroy();
    }
  })
</script>

<style lang='scss' scope>
  .Wbackground {
    background-color: #92c892;
  }
</style>