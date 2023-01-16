<template>
   <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="content">
        <el-aside class="aside">
          Aside
        </el-aside>
        <el-container>
          <main class="main">
            <router-view #default="{ Component }">
              <component :is="Component" :key="$route.fullPath"></component>
            </router-view>
          </main>
          <el-footer>
            Footer
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Index'
  }
</script>

<script setup>
  import Header from '../Header/index.vue';
</script>

<style lang="scss" scoped>
  .el-container {
    height: 100%;
  }
  .content {
    height: 0;
  }
  .aside {
    width: 200px;
    padding-left: 20px;
  }
  .main {
    flex: 1;
    overflow: hidden;
    padding-right: 20px;
  }
</style>