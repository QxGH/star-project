const config = [
  {
    id: 1,
    title: '平台概况',
    icon: 'el-icon-house',
    path: '/',
    roles: [],
    children: []
  }, {
    id: 2,
    title: '平台装修',
    icon: 'el-icon-receiving',
    path: '/paltformDesign/',
    children: [
      {
        title: '平台装修',
        path: '',
        roles: [],
        children: [
          {
            title: '平台装修',
            path: '/paltformDesign/',
            roles: ['manager']
          }, {
            title: '精美模板',
            path: '/paltformDesign/exquisiteTemplate',
            roles: ['manager']
          }
        ]
      }, {
        title: '渠道设置',
        path: '',
        roles: [],
        children: [
          {
            title: '微信小程序',
            path: '/paltformDesign/appletSetting',
            roles: ['manager']
          }, {
            title: '微信公众号',
            path: '/paltformDesign/officialAccountSetting',
            roles: ['manager']
          }, {
            title: '支付设置',
            path: '/paltformDesign/paySetting',
            roles: ['manager']
          }
        ]
      }
    ]
  }, {
    id: 3,
    title: '商品管理',
    icon: 'el-icon-goods',
    path: '/goodsManage/',
    children: [
      {
        title: '商品管理',
        path: '',
        roles: [],
        children: [
          {
            title: '商品库',
            path: '/goodsManage/',
            roles: ['manager']
          }, {
            title: '商品分类',
            path: '/goodsManage/goodsCategory',
            roles: ['manager']
          }, {
            title: '规格属性',
            path: '/goodsManage/goodsSpec',
            roles: ['manager']
          }, {
            title: '商品设置',
            path: '/goodsManage/goodsSetting',
            roles: ['manager']
          }
        ]
      }
    ]
  }, {
    id: 4,
    title: '订单管理',
    icon: 'el-icon-document',
    path: '/3',
    children: [
      {
        title: '物流订单',
        path: '/3-1',
        roles: ['manager']
      }, {
        title: '自提订单',
        path: '/3-2',
        roles: ['manager']
      }, {
        title: '售后退款',
        path: '/3-3',
        roles: ['manager']
      }, {
        title: '订单设置',
        path: '/3-4',
        roles: ['manager']
      }
    ]
  }, {
    id: 5,
    title: '客户管理',
    icon: 'el-icon-user',
    path: '/4',
    roles: [],
    children: []
  }, {
    id: 6,
    title: '互动营销',
    icon: 'el-icon-place',
    path: '/5',
    children: [
      {
        title: '活动创建',
        path: '/5-1',
        roles: ['manager']
      }, {
        title: '活动管理',
        path: '/5-2',
        roles: ['manager']
      }, {
        title: '销售渠道',
        path: '/5-3',
        roles: ['manager']
      }
    ]
  }, {
    id: 7,
    title: '资产管理',
    icon: 'el-icon-bank-card',
    path: '/6',
    roles: ['admin'],
    children: []
  }, {
    id: 8,
    title: '平台设置',
    icon: 'el-icon-setting',
    path: '/7',
    children: [
      {
        title: '平台设置',
        path: '/7-1',
        roles: ['admin']
      }, {
        title: '门店管理',
        path: '/7-2',
        roles: ['manager']
      }
    ]
  }
];

export default config;