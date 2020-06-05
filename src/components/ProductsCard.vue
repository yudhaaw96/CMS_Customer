<template>
  <b-row
    id="products"
    class="products"
    cols="1"
    cols-sm="1"
    cols-md="1"
    cols-lg="1"
    align-v="center"
    align-h="center"
  >
    <b-col cols="12" sm="12" md="12" lg="12">
      <div class="d-flex flex-wrap justify-content-around">
        <b-card
          class="col-6 col-sm-4 col-md-4 col-lg-3 "
          v-for="(product, index) in products"
          :key="index"
          :title="product.name"
          :img-src="product.image_url"
          img-top
        >
          <b-card-text class="text-success font-weight-bold">
            Price: {{ currencyFormater(product.price) }}<br />
            Stock: {{ product.stock }}<br />
          </b-card-text>
          <b-button @click="selectProduct(product)" v-b-modal.addtocart variant="outline-success"><font-awesome-icon icon="cart-arrow-down" /> Add to Cart</b-button>
        </b-card>
          <b-modal
            id="addtocart"
            ref="modal"
            :title="selectedProductName"
            ok-title="Add to Cart"
            centered
            header-bg-variant="info"
            header-text-variant="light"
            @ok="buy"
          >
            <form ref="form">
              <b-img :src="selectedProductImage" center rounded="circle" width="200%"></b-img>
              <b-form-group
                label="Qty"
                label-for="qty-input"
                invalid-feedback="Quantity is required"
              >
                <b-form-input
                  id="qty-input"
                  type="number"
                  min="1"
                  placeholder="1"
                  v-model="quantity"
                  required
                ></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import currencyFormater from '@/helpers/currency.js'

export default {
  name: 'ProductCard',
  data () {
    return {
      isHidden: false,
      quantity: 1,
      selectedProductName: '',
      selectedProductImage: '',
      error: 'Dear Customer..'
    }
  },
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('fetchproducts')
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data.Products)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    currencyFormater (money) {
      return currencyFormater(money)
    },
    selectProduct (product) {
      this.quantity = 1
      this.$store.commit('SET_SELECTED_PRODUCT', product)
      this.selectedProductName = product.name
      this.selectedProductImage = product.image_url
    },
    buy () {
      const payload = {
        ProductId: this.$store.state.selectedProduct.id,
        quantity: this.quantity
      }
      this.$store
        .dispatch('addtocart', payload)
        .then(({ data }) => {
          this.$swal.fire(
            `Item's added "${this.selectedProductName}"`,
            'You just added an item!',
            'success'
          )
        })
        .catch(err => {
          this.$swal.fire(
            `${this.error}`,
            `"${err.response.data.message}"`,
            'warning'
          )
          console.log(err.response)
        })
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isSignedIn () {
      return this.$store.state.isSignedIn
    },
    selectedProduct () {
      return this.$store.state.selectedProduct
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style></style>
