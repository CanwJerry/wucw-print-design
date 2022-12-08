import { createRouter, createWebHashHistory } from 'vue-router';

// routes 各页面路由
// 各模块路由：通过glob导入进来，可根据接口返回筛选成动态路由
const staticRoutes = Object.values(import.meta.glob('../views/**/routes.js', { eager: true }))
  .map((esm) => esm.default || [])
  .flat();

export const routes = [
  // 根路径
  { path: '/', name: 'Root', redirect: '/Index' },

  {path: '/index', name: 'Index', component: () => import('@/views/Index/index.vue'), meta: { title: 'index', affix: true }},

  { path: '/login', name: 'Login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录', affix: true } },

  // 需登录进来的各页面
  // {
  //   path: '/index', name: 'Index', component: () => import('@/views/Index/index.vue'), redirect: '/Home',
  //   // 从view下的其他模块目录导入进来
  //   children: [
  //     // 首页
  //     { path: '/home', name: 'Home', component: () => import('@/views/Home/index.vue'), meta: { title: '首页', affix: true } },
  //     // 先全部加进来再用removeRoute方式实现动态路由
  //     ...staticRoutes,
  //   ],
  // },

  // 错误页，404页面放最后以匹配*
  { path: '/404', component: () => import('common/src/Error/404.vue'), meta: { title: '404', noLogin: true } },
  { path: '/:pathMatch(.*)*', component: () => import('common/src/Error/404.vue'), meta: { title: '404', noLogin: true } },
];

// router
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, form) => {
  document.title = to.meta.title;
})

export default router;