import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';
import { userStore } from '@/store/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'article',
          name: 'Article',
          component: () => import('@/views/article/index.vue'),
        },
        {
          path: 'article/detail/:id',
          name: 'DetailArticle',
          component: () => import('@/views/detail-article/index.vue'),
        },
        {
          path: 'article/search',
          name: 'SearchArticle',
          component: () => import('@/views/search-article/index.vue'),
        },
        {
          path: 'article/statistics',
          name: 'StatisticsArticle',
          component: () => import('@/views/statistics-article/index.vue'),
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/profile/index.vue'),
        },
        {
          path: 'documentation',
          name: 'Documentation',
          component: () => import('@/views/documenation/index.vue'),
        },
        {
          path: 'books',
          name: 'Books',
          component: () => import('@/views/books/index.vue'),
        },
        {
          path: 'travel',
          name: 'Travel',
          component: () => import('@/views/travel/index.vue'),
        },
        {
          path: 'travel/:id',
          name: 'SceneImage',
          component: () => import('@/views/travel/children/scene-image/index.vue'),
        },
      ],
    },
    {
      path: '/draft',
      component: () => import('@/views/draft/index.vue'),
      name: 'Draft',
    },
    {
      path: '/treasure-box',
      component: () => import('@/views/treasure-box/index.vue'),
      name: 'TreasureBox',
    },
    {
      path: '/login',
      component: () => import('@/views/login/Index.vue'),
      name: 'Login',
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404/index.vue'),
      name: 'PageNotFound',
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = userStore();

  if (store.token) {
    if (to.path === '/login') {
      next('/home');
    } else {
      if (!store.userInfo?.roles?.length) {
        try {
          await store.getUserInfo();
        } catch (error) {}
      }
      next();
    }
  }
  next();
});

export default router;
