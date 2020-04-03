import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('views/layout'),
    meta: {
      roles: [],
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('views/home'),
        meta: {
          roles: ['manager'],
        }
      },{
        path: '/paltformDesign',
        name: 'PaltformDesign',
        component: () => import('@/views/platform_design/platform_design'),
        meta: {
          roles: ['manager'],
        }
      }, {
        path: '/editor',
        name: 'Editor',
        component: () => import('views/editor'),
        meta: {
          roles: ['admin'],
        }
      }, {
        path: '/tinymce',
        name: 'Tinymce',
        component: () => import('views/tinymce'),
        meta: {
          roles: ['manager'],
        }
      }, {
        path: '/goodsManage',
        name: 'GoodsManage',
        component: () => import('views/goods/goods_manage'),
        meta: {
          roles: ['manager'],
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
