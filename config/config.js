// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ path: '/user', component: './Welcome' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/hooks' },
        {
          path:'/hoc',
          name:'hoc',
          component:'./Hoc',
        },
        {
          path:'form',
          name: 'form',
          icon: 'smile',
          routes:[
            {
              path: 'form',
              // path: 'form#array',
              name: 'arr',
              component: './Form',
            },
            {
              path: 'form#rule',
              name: 'rule',
              component: './Form',
            },
            {
              path: 'form#tree',
              name: 'tree',
              component: './Form',
            },
          ]
        },
        {
          path: 'carousel',
          name: 'carousel',
          icon: 'block',
          routes:[
            {
              path: 'carousel',
              name: 'carousel',
              component: './Carousel',
            },
          ]
        },{
          path: 'chart',
          name: 'chart',
          icon: 'block',
          routes:[
            {
              path: 'pyramid',
              name: 'pyramid',
              component: './HightChart',
            }
          ]
        },
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
