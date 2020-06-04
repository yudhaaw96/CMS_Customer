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
            Price: {{ product.price }}<br />
            Stock: {{ product.stock }}<br />
          </b-card-text>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
      isHidden: false
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
    buy (product) {
      this.$store
        .dispatch('addtocart')
        .then(({ data }) => {})
        .catch(err => {
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
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style></style>
