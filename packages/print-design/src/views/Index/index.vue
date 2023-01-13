<template>
   <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="content">
        <el-aside width="200px">
          Aside
        </el-aside>
        <el-container>
          <el-main>
            <router-view #default="{ Component }">
              <component :is="Component" :key="$route.fullPath"></component>
            </router-view>
          </el-main>
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
</style>