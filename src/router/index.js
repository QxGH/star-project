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
      }, {
        path: 'paltformDesign', // 店铺装修
        component: () => import('@/views/platform_design/index'),
        meta: {
          roles: ['manager'],
        },
        children: [
          {
            path: '/',
            name: 'PaltformDesign', // 店铺装修
            component: () => import('@/views/platform_design/platform_design'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'exquisiteTemplate',
            name: 'ExquisiteTemplate',  // 精美模板
            component: () => import('@/views/platform_design/exquisite_template'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'appletSetting',
            name: 'AppletSetting',  // 小程序设置
            component: () => import('@/views/platform_design/applet_setting'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'officialAccountSetting',
            name: 'OfficialAccountSetting', // 公众号设置
            component: () => import('@/views/platform_design/official_account_setting'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'paySetting',
            name: 'PaySetting', // 支付设置
            component: () => import('@/views/platform_design/pay_setting'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'authorizedSuccess',
            name: 'AuthorizedSuccess', // 授权成功
            component: () => import('@/views/platform_design/authorized_success'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'authorizedFail',
            name: 'AuthorizedFail', // 授权失败
            component: () => import('@/views/platform_design/authorized_fail'),
            meta: {
              roles: ['manager'],
            }
          }
        ]
      }, {
        path: 'goodsManage', // 商品管理
        component: () => import('@/views/goods_manage/index'),
        meta: {
          roles: ['manager'],
        },
        children: [
          {
            path: '/',
            name: 'GoodsManage',  // 商品管理 -商品库
            component: () => import('@/views/goods_manage/goods_manage'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'goodsCreate',
            name: 'GoodsCreate',  // 新建商品
            component: () => import('@/views/goods_manage/goods_create'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'goodsCategory',
            name: 'GoodsCategory',  // 商品分类
            component: () => import('@/views/goods_manage/goods_category'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'goodsSpec',
            name: 'GoodsSpec',  // 商品分类
            component: () => import('@/views/goods_manage/goods_spec'),
            meta: {
              roles: ['manager'],
            }
          }, {
            path: 'goodsSetting',
            name: 'GoodsSetting',  // 商品分类
            component: () => import('@/views/goods_manage/goods_setting'),
            meta: {
              roles: ['manager'],
            }
          }
        ]
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
