import Vue from 'vue'
import Vuex from 'vuex'
import modulesTest from './modules/test'

Vue.use(Vuex)

const state = {
  breadcrumb: "平台名称",
  domainURL: process.env.NODE_ENV == 'production' ? 'https://www.xingchen.cn' : 'https://testadmin.xingchen.cn'
};
const mutations = {};
const actions = {};

export default new Vuex.Store({
  modules: {
    modulesTest
  },
  state,
  mutations,
  actions
})
