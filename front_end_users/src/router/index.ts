import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
import UIRoute from '../pages/admin/ui/route'
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'home' },
  },
  {
    name: 'user',
    path: '/user',
    component: AppLayout,
    
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('../pages/admin/dashboard/users/Home.vue'),
      },
      {
        name: 'coursDetail',
        path: 'coursDetail/:id',
        component: () => import('../pages/admin/dashboard/users/CoursDetail.vue'),
        props: true,

      },
      {
        name: 'postDetail',
        path: 'postDetail/:id',
        component: () => import('../pages/admin/dashboard/users/posts/PostDetail.vue'),
        props: true,

      },
      {
        name: 'posts',
        path: 'posts',
        component: () => import('../pages/admin/dashboard/users/posts/Posts.vue'),
      },
      {
        name: 'introduce',
        path: 'introduce',
        component: () => import('../pages/admin/dashboard/users/Introduce.vue'),
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('../pages/admin/dashboard/users/RegisterAccount.vue'),
      },
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/admin/dashboard/users/LogIn.vue'),
      },
      
      UIRoute,
    ],
  },
  {
    path: '/auth',
    component: AppLayout,
    beforeEnter: (to, from, next) => {
      // Thực hiện kiểm tra điều kiện
      if (cookies.isKey('user')) {
        // Cho phép chuyển hướng
        next();
      } else {
        // chuyển hướng đến route khác
        next({ name: 'login' });
      }
    },
    children: [
      {
        name: 'RegInfo',
        path: 'RegInfo',
        component: () => import('../pages/admin/dashboard/users/RegCoursesDetail.vue'),
      },
      {
        name: 'billInfo',
        path: 'billInfo',
        component: () => import('../pages/admin/dashboard/Bill_Information/BillInfo.vue'),
        props: true,
      },
      {
        name: 'schedule',
        path: 'schedule',
        component: () => import('../pages/admin/dashboard/users/Schedule.vue'),
      },
      {
        name: 'studyResult',
        path: 'studyResult',
        component: () => import('../pages/admin/dashboard/users/StudyResult.vue'),
      },
      {
        name: 'classView',
        path: 'classView',
        component: () => import('../pages/admin/dashboard/users/classes/ClassView.vue'),
      },
      {
        name: 'privateInfo',
        path: 'privateInfo',
        component: () => import('../pages/admin/dashboard/users/PrivateInfo.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scrollTo(0, 0)
    }
  },
  routes,
})

export default router
