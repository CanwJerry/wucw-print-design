import { createRouter, createWebHashHistory } from 'vue-router';

// routes 各页面路由
export const routes = [
  // 根路径
  { path: '/', name: 'Root', redirect: '/index' },
  // 重定向
  { path: '/index', name: 'Index', component: () => import('@/views/index/Index.vue'), meta: { title: '单据设计器' }  },
  // 预览界面
  { path: '/preview', name: 'Preview', component: () => import('@/views/index/components/FormComponentPanel/index.vue'), meta: { title: '单据预览' } },
  // 登录界面
  { path: '/login', name: 'Login', component: () => import('@/views/login/index.vue'), meta: { title: '登录界面' }  },
  // 错误页，404页面放最后以匹配*
  { path: '/404', component: () => import('@/views/error/404.vue'), meta: { title: '404', noLogin: true } },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/error/404.vue'), meta: { noLogin: true } },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, form) => {
  document.title = to.meta.title;
   
  const token = localStorage.getItem('accessToken');
  
  if(!token) {
    if(to.path !== '/login') {
      return '/login';
    }
  } else {
    if(to.path === '/login') {
      return '/index';
    }
  }
})

export default router;