<template>
  <div id="power-screen">
    <div class="header"></div>
    <div class="main">
      <div class="left">
        <div class="left-top"></div>
        <div class="left-bottom"></div>
      </div>
      <div class="center">
        <div class="center-top"></div>
        <div class="center-bottom"></div>
      </div>
      <div class="right">
        <div class="right-top"></div>
        <div class="right-center"></div>
        <div class="right-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Screen',
  };
</script>

<script setup>
  import useScalePage from '@/hooks/useScalePage.js';

  useScalePage();
</script>

<style lang="scss" scoped>
  $border: 1px solid #fff;

  @mixin bg($url){
    background-image: url($url);
    background-repeat: no-repeat;
  }

  #power-screen {
    position: relative;
    transform-origin: left top;
    color: #fff;
    @include bg('common/src/views/PowerScreen-tml/images/bg.png');
  }

  .header {
    text-align: center;
    width: 100%;
    height: 2.6vw;
    @include bg('common/src/views/PowerScreen-tml/images/bg_header.svg');
  }
</style>