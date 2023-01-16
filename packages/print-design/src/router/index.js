import { createRouter, createWebHashHistory } from 'vue-router';

// 获取文件下独立定义的routes
// const routesObj = Object.values(import.meta.glob('../views/**/routes.js', { eager: true })).map(esm => esm.default || []).flat();

// routes 各页面路由
export const routes = [
  // 根路径
  { path: '/', name: 'Root', redirect: '/index' },

  // 首页界面
  { 
    path: '/index', name: 'Index', component: () => import('@/views/Index/index.vue'), redirect: '/home',
    children: [
      // 导航界面
      { path: '/home', name: 'Home', component: () => import('@/views/Home/index.vue'), meta: { title: '首页' } },
      // 设计器界面
      { path: '/print', name: 'Print', component: () => import('@/views/Print/Index.vue'), meta: { title: '单据设计器' }  },
    ]
  },
  
  // 登录界面
  { path: '/login', name: 'Login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录' }  },
  // 注册界面
  { path: '/signup', name: 'Signup', component: () => import('@/views/Signup/index.vue'), meta: { title: '注册' }  },
  // 忘记密码界面
  { path: '/forget', name: 'Forget', component: () => import('@/views/Forget/index.vue'), meta: { title: '忘记密码' }  },
  // 预览界面
  { path: '/preview', name: 'Preview', component: () => import('@/views/Print/components/FormComponentPanel/index.vue'), meta: { title: '单据预览' } },
  // 大屏展示界面
  { path: '/powerScreen', name: 'PowerScreen', component: () => import('common/src/views/PowerScreen-tml/index.vue'), meta: { title: 'PowerScreen' } },
  // 错误页，404页面放最后以匹配*
  { path: '/404', component: () => import('common/src/views/Error/404.vue'), meta: { title: '404', noLogin: true } },
  { path: '/:pathMatch(.*)*', component: () => import('common/src/views/Error/404.vue'), meta: { title: '404', noLogin: true } },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, form) => {
  document.title = to.meta.title;
   
  const token = sessionStorage.getItem('accessToken');
  
  if(!token) {
    const path = to.path;
    if(path !== '/login' && path !== '/forget' && path !== '/signup') {
      return '/login';
    }
  } else {
    if(to.path === '/login') {
      return '/index';
    }
  }
})

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: [],
  });
  router.options.isAddDynamicMenuRoutes = false;
  router.matcher = newRouter.matcher; // reset router
}

export default router;