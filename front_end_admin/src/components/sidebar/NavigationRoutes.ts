export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Tổng quan',
      meta: {
        icon: 'dashboard',
      },
      role:0
    },
    {
      name: 'personnel',
      displayName: 'Quản lý nhân sự',
      meta: {
        icon: 'account_circle',
      },
      role:0
    },
    {
      name: 'courses',
      displayName: 'Quản lý khóa học',
      meta: {
        icon: 'explicit',
      },
      role:0
    
    },
    {
      name: 'classes',
      displayName: 'Quản lý lớp học',
      meta: {
        icon: 'class',
      },
      role:0
    
    },
    {
      name: 'RegisterManager',
      displayName: 'Quản lý đăng ký',
      meta: {
        icon: 'assignment',
      },
      role:0
    },
    {
      name: 'assessments',
      displayName: 'Quản lý đánh giá',
      meta: {
        icon: 'stars',
      },
      role:0
    },
    {
      name: 'promotions',
      displayName: 'Quản lý ưu đãi',
      meta: {
        icon: 'money_off',
      },
      role:0
    },
    {
      name: 'subscribers',
      displayName: 'Thông tin người dùng',
      meta: {
        icon: 'people',
      },
      role:0
    },
    {
      name: 'posts',
      displayName: 'Quản lý bài viết',
      meta: {
        icon: 'fiber_new',
      },
      role:0
    },
    {
      name: 'billChart',
      displayName: 'Thống kê doanh thu',
      meta: {
        icon: 'equalizer',
      },
      role:1
    },
    {
      name: 'collectFee',
      displayName: 'Thu học phí',
      meta: {
        icon: 'attach_money',
      },
      role:1
    },
    {
      name: 'teacherClass',
      displayName: 'Lớp học',
      meta: {
        icon: 'class',
      },
      role:2
    },
    {
      name: 'learnSchedule',
      displayName: 'Lịch dạy học',
      meta: {
        icon: 'access_time',
      },
      role:2
    },
    // {
    //   name: 'pages',
    //   displayName: 'menu.pages',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login-singup',
    //     },
    //     {
    //       name: '404-pages',
    //       displayName: 'menu.404-pages',
    //     },
    //     {
    //       name: 'faq',
    //       displayName: 'menu.faq',
    //     },
    //   ],
    // },
  ] as INavigationRoute[],
}
