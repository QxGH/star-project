import Vue from 'vue'
import vuescroll from 'vuescroll';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import api from './api'
Vue.prototype.$api = api;

import App from './App.vue'
import router from './router'
import store from './store'
import routerBeforeEach from '@/router/beforeEach'


Vue.use(vuescroll); // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  vuescroll: {},
  scrollPanel: {
    scrollingX: false
  },
  rail: {},
  bar: {
    background: "#000000",
    opacity: "0.2",
    onlyShowBarOnScroll: false
  }
};

Vue.use(ElementUI);

Vue.config.productionTip = false

/* Router 全局前置守卫 */
// router.beforeEach(routerBeforeEach)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
