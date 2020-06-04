import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false,
    products: [],
    cart: [],
    cartPaid: []
  },
  mutations: {
    SET_SIGNED_IN (state, options) {
      state.isSignedIn = options
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_CART_PAID (state, payload) {
      state.cartPaid = payload
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
    },
    fetchproducts (context, payload) {
      return axiosShot({
        method: 'get',
        url: '/products'
      })
    },
    fetchcart (context, payload) {
      return axiosShot({
        method: 'get',
        url: '/cart/items',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    fetchcartpaid (context, payload) {
      return axiosShot({
        method: 'get',
        url: '/cart/items/paid',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    },
    deleteanitem (context, payload) {
      return axiosShot({
        method: 'delete',
        url: '/cart/items/' + payload,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
