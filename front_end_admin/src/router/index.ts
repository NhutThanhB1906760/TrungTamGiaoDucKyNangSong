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
    redirect: { name: 'admin' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    beforeEnter: (to, from, next) => {
      // Thực hiện kiểm tra điều kiện
      if (cookies.get('user')?.role == 0) {
        // Cho phép chuyển hướng
        next();
      } else {
        // chuyển hướng đến route khác
        next({ name: 'login' });
      }
    },

    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'courses',
        path: 'courses',
        component: () => import('../pages/admin/dashboard/courses/CoursesInfo.vue'),
      },
      {
        name: 'personnel',
        path: 'personnel',
        component: () => import('../pages/admin/dashboard/personnel/PersonnelInfor.vue'),
      },
      {
        name: 'personnelInfo',
        path: 'personnel/:id',
        props:true,
        component: () => import('../pages/admin/dashboard/personnel/PersonnelDetail.vue'),
      },
      {
        name: 'classes',
        path: 'classes',
        component: () => import('../pages/admin/dashboard/class/ClassInfo.vue'),
      },
      {
        name: 'RegisterManager',
        path: 'RegisterManager',
        component: () => import('../pages/admin/dashboard/RegisterCoursesInfo/RegCoursInfo.vue'),
      },
      {
        name: 'assessments',
        path: 'assessments',
        component: () => import('../pages/admin/dashboard/assessment/AssessmentInfo.vue'),
      },
      {
        name: 'promotions',
        path: 'promotions',
        component: () => import('../pages/admin/dashboard/promotion/PromotionDate.vue'),
      },
      {
        name: 'posts',
        path: 'posts',
        component: () => import('../pages/admin/dashboard/posts/PostsInfo.vue'),
      },
      {
        name: 'subscribers',
        path: 'subscribers',
        component: () => import('../pages/admin/dashboard/subscribers/subscribersInfo.vue'),
      },
      UIRoute,
    ],
  },
  {
    name: 'teacher',
    path: '/teacher',
    redirect: { name: 'teacherClass' },

    component: AppLayout,
    beforeEnter: (to, from, next) => {
      // Thực hiện kiểm tra điều kiện
      if (cookies.get('user')?.role == 2) {
        // Cho phép chuyển hướng
        next();
      } else {
        // chuyển hướng đến route khác
        next({ name: 'login' });
      }
    },
    children: [

      {
        name: 'teacherClass',
        path: 'teacherClass',
        component: () => import('../pages/admin/dashboard/Teachers/ClassTeacher.vue'),
      },
      {
        name: 'learnSchedule',
        path: 'learnSchedule',
        component: () => import('../pages/admin/dashboard/Teachers/LearnSchedule.vue'),
      },
      UIRoute,
    ],
  },
  {
    name: 'staff',
    path: '/staff',
    redirect: { name: 'billChart' },

    component: AppLayout,
    beforeEnter: (to, from, next) => {
      // Thực hiện kiểm tra điều kiện
      if (cookies.get('user')?.role == 1) {
        // Cho phép chuyển hướng
        next();
      } else {
        // chuyển hướng đến route khác
        next({ name: 'login' });
      }
    },
    children: [

      {
        name: 'collectFee',
        path: 'collectFee',
        component: () => import('../pages/admin/dashboard/staffs/CollectFee.vue'),
      },
      {
        name: 'billChart',
        path: 'billChart',
        component: () => import('../pages/admin/dashboard/staffs/BillsChartView.vue'),
      },
      UIRoute,
    ],
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
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
