import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [
    createVuexPersistedState({
      key:'vuex',
      storage:window.localStorage,
      whiteList:[],
      blackList: [],
    }),
  ]
})
