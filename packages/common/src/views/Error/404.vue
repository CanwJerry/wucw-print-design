<!-- 404页面 -->
<template>
  <main class="Error404-root">
    <img src="./404.png">
    <article>哎呀，你访问的页面不存在哦~</article>
    <footer>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="$router.push('/')">去首页</el-button>
    </footer>
  </main>
</template>

<script>
  export default {
    name: 'Error404',
  };
</script>

<style scoped lang="scss">
  .Error404-root{
    text-align: center;
    img{
      width: 33.33vw;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    article{
      color: #808695;
      font-size: 20px;
      margin: 0 0 20px 0;
    }
  }
</style>
