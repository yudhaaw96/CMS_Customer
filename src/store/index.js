import Vue from 'vue'
import Vuex from 'vuex'
import axiosShot from '../axios/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false,
    products: [],
    cart: [],
    cartPaid: [],
    selectedProduct: null
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
    },
    SET_SELECTED_PRODUCT (state, payload) {
      state.selectedProduct = payload
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
    addtocart (context, payload) {
      return axiosShot({
        method: 'post',
        url: '/cart',
        data: payload,
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
    },
    checkout (context, payload) {
      return axiosShot({
        method: 'put',
        url: '/cart/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
