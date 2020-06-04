import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false
  },
  mutations: {
    SET_SIGNED_IN (state, options) {
      state.isSignedIn = options
    }
  },
  actions: {
    signin (context, payload) {
      return axiosShot({
        method: 'post',
        url: '/signin',
        data: payload
      })
    },
    signup (context, payload) {
      return axiosShot({
        method: 'post',
        url: '/signup',
        data: payload
      })
    }
  },
  modules: {
  }
})
