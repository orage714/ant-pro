export default [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ path: '/user', component: './Welcome' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/hoc' },
        {
          path:'/hoc',
          name:'hoc',
          component:'./Hoc',
        },
        {
          path:'./form',
          name: 'form',
          icon: 'smile',
          routes:[
            {
              path: './form',
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
        {
          path:'map',
          name:'map',
          routes:[{
            path:'national',
            name:'national',
            component:'./Map/National'
          },{
            path:'city',
            name:'city',
            component:'./Map/City'
          }]
        },
      ],
    },
  ];