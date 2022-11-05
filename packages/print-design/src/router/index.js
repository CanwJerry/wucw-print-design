import { createRouter, createWebHashHistory } from 'vue-router';

// routes 各页面路由
export const routes = [
  // 根路径
  { path: '/', name: 'Root', redirect: '/index' },
  // 重定向
  { path: '/index', name: 'Index', component: () => import('@/views/index/Index.vue'), meta: { title: '打印订单设计器' }  },
  // 预览界面
  { path: '/preview', name: 'Preview', component: () => import('@/views/index/components/FormComponentPanel/index.vue'), meta: { title: '预览' } },

  // 错误页，404页面放最后以匹配*
  { path: '/404', component: () => import('@/views/error/404.vue'), meta: { title: '404', noLogin: true } },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/error/404.vue'), meta: { noLogin: true } },
];

// router
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;