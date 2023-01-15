<template>
  <div class="power-screen">
    <div class="header">123</div>
    <div class="main">
      <div class="left">
        <div>left 1</div>
        <div>left 2</div>
      </div>
      <div class="center">
        <div class="chart">center 1</div>
        <div class="count">center 2</div>
      </div>
      <div class="right">
        <div>right 1</div>
        <div>right 2</div>
        <div>right 3</div>
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
  import useScalePage from '@/hooks/useScalePage.js';

  const options = {
    targetX: 1920,
    targetY: 1080,
    targetRatio: 16 / 9,
  }

  useScalePage(options);
</script>

<style lang="scss" scoped>
  .power-screen {
    display: flex;
    flex-direction: column;
    transform-origin: left top;
  }

  .header {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .main {
    display: flex;
    justify-content: space-between;
    .left {
      div {
        width: 460px;
        height: 515px;
      }
    }

    .center {
      width: 100%;
      .chart {
        height: 830px;
      }
      .count {
        height: 200px;
      }
    }

    .right {
      div {
        width: 460px;
        height: 343.3px;
      }
    }
  }
</style>

<style lang="scss">
  html, body {
    position: relative;
    transform-origin: left top;
  }
</style>