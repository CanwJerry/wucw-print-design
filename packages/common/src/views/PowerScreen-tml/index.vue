<template>
  <div class="power-screen">
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
    name: 'PowerScreen'
  }
</script>

<script setup>
  import useScalePage from './useScalePage.js';

  const options = {
    targetX: 1920,
    targetY: 1080,
    targetRatio: 16 / 9,
  }

  useScalePage(options);
</script>

<style lang="scss" scoped>
  $border: 1px solid #fff;

  .power-screen {
    color: #fff;
    background: url('./images/bg.png') no-repeat;
  }

  .header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: url('./images/bg_header.svg') no-repeat;
  }

  .main {
    position: relative;
  }

  .left-top {
    position: absolute;
    height: 515px;
    width: 480px;
    background: url('./images/bg_left-top.svg') no-repeat;
  }
  .left-bottom {
    position: absolute;
    top: 515px;
    height: 515px;
    width: 480px;
    background: url('./images/bg_left_bottom.svg') no-repeat;
  }
  .center-top {
    border: $border;
    position: absolute;
    top: 0;
    left: 480px;
    height: 800px;
    width: 960px;
  }
  .center-bottom {
    position: absolute;
    top: 800px;
    left: 480px;
    height: 230px;
    width: 960px;
  }
  .right-top {
    position: absolute;
    top: 0;
    right: 0;
    height: 343px;
    width: 480px;
    background: url('./images/bg_right_top.svg') no-repeat;
  }
  .right-center {
    position: absolute;
    top: 344px;
    right: 0;
    height: 343px;
    width: 480px;
    background: url('./images/bg_right_center.svg') no-repeat;
  }
  .right-bottom {
    position: absolute;
    top: 687px;
    right: 0;
    height: 343px;
    width: 480px;
    background: url('./images/bg_right_bottom.svg') no-repeat;
  }
</style>

<style lang="scss">
  html, body {
    position: relative;
    transform-origin: left top;
    overflow: hidden;
  }
</style>