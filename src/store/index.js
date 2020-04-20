import Vue from 'vue'
import Vuex from 'vuex'
import modulesCommon from './modules/common'

Vue.use(Vuex)

const state = {
  breadcrumb: "平台名称",
  requestSource: 'pc',
  domainURL: process.env.NODE_ENV == 'production' ? 'https://www.xingchen.cn' : 'https://testadmin.xingchen.cn'
};
const mutations = {
  CHANGE_BREADCRUMB(state, val) {
    state.breadcrumb = val;
  }
};
const actions = {};

export default new Vuex.Store({
  modules: {
    modulesCommon
  },
  state,
  mutations,
  actions
})
