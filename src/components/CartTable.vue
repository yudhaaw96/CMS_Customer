<template>
  <div>
    <b-button @click="checkout" block variant="success"
      ><h1><font-awesome-icon icon="shopping-basket" /> Checkout</h1></b-button
    >
    <hr />
    <div>
      <h3>
        <font-awesome-icon icon="shopping-cart" /> Your Cart's items (unpaid:
        {{ totalItems }})
      </h3>
      <b-row>
        <b-col lg="3" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="2"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="3" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        id="products"
        class="table"
        bordered="bordered"
        head-variant="dark"
        tbody-tr-class="text-center text-justify"
        tbody-td-class="align-middle"
        thead-tr-class="text-center text-justify"
        :items="cart[0]"
        :fields="fields"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="md"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(Name)="data">
          <p class="font-weight-bold">{{ data.value }}</p>
        </template>
        <template v-slot:cell(Image)="data">
          <img :src="data.value" width="200" height="auto" />
        </template>
        <template v-slot:cell(TotalPrice)="data">
          {{ convertToCurrency(data.value) }}
        </template>
        <template v-slot:cell(id)="data">
          <b-button variant="warning" v-b-modal.edititem @click="selectProduct(data.value)"
            ><font-awesome-icon icon="sort-numeric-up" /> Update Qty</b-button
          >
          -
          <b-button variant="danger" @click="showMsgBoxDelete(data.value.id)"
            ><font-awesome-icon icon="trash-alt" /> Delete</b-button
          >
        </template>
      </b-table>
    </div>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
    <!-- MODAL -->
    <b-modal
      id="edititem"
      ref="modal"
      :title="selectedProductName"
      ok-title="Update item quantity"
      centered
      header-bg-variant="info"
      header-text-variant="light"
      @ok="updateItem"
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
            v-model="quantity"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import currency from '@/helpers/currency.js'

export default {
  name: 'CartTable',
  props: ['perPage', 'pageOptions'],
  data () {
    return {
      show: false,
      bordered: true,
      filter: null,
      currentPage: 1,
      sortBy: 'id',
      sortDesc: true,
      fields: [
        { key: 'Name', sortable: true },
        { key: 'Image', sortable: false },
        { key: 'Quantity', sortable: true },
        { key: 'TotalPrice', sortable: true },
        { key: 'id', label: 'Options' }
      ],
      boxDelete: '',
      successDelete: 'Success Delete',
      successCheckout: 'Thank you!',
      errorCheckout: 'Opps!',
      selectedProductName: '',
      selectedProductImage: '',
      selectedCartItemId: null,
      quantity: 1,
      errorUpdate: 'Ouch!'
    }
  },
  methods: {
    fetchCart () {
      this.$store
        .dispatch('fetchcart')
        .then(({ data }) => {
          this.$store.commit('SET_CART', data.CartNotYetPaid)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    convertToCurrency (money) {
      return currency(money)
    },
    selectProduct (product) {
      this.quantity = product.qty
      this.$store.commit('SET_SELECTED_PRODUCT', product)
      this.selectedCartItemId = product.id
      this.selectedProductName = product.product.name
      this.selectedProductImage = product.product.image_url
    },
    updateItem () {
      const payload = {
        id: this.selectedCartItemId,
        quantity: parseInt(this.quantity)
      }
      console.log(payload)
      this.$store.dispatch('updateitem', payload)
        .then(({ data }) => {
          this.$swal.fire(
            `Item's updated "${this.selectedProductName}"`,
            'You just update an item\'s quantity!',
            'success'
          )
          this.fetchCart()
        })
        .catch(err => {
          this.$swal.fire(
            `${this.errorUpdate}`,
            `"${err.response.data.message}"`,
            'warning'
          )
          this.fetchCart()
          console.log(err.response)
        })
    },
    checkout () {
      this.$store
        .dispatch('checkout')
        .then(({ data }) => {
          this.$swal.fire(
            `${this.successCheckout}`,
            'Your items will be delivered soon!',
            'success'
          )
          this.$router.push('/history')
        })
        .catch(err => {
          this.fetchCart()
          this.$swal.fire(
            `${this.errorCheckout}`,
            `"${err.response.data.message}"`,
            'error'
          )
        })
    },
    showMsgBoxDelete (id) {
      this.boxDelete = ''
      this.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete?', {
          title: 'Please confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.boxDelete = value
          if (value === true) {
            this.deleteProduct(id)
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct (id) {
      this.$store
        .dispatch('deleteanitem', id)
        .then(({ data }) => {
          this.fetchCart()
          this.$swal.fire(
            `${this.successDelete}`,
            'You just deleted an item!',
            'success'
          )
        })
        .catch(({ err }) => {
          console.log(err.response)
        })
    }
  },
  computed: {
    cart () {
      const cart = []
      let totalPrice = 0
      this.$store.state.cart.forEach(el => {
        cart.push({
          Name: el.Product.name,
          Image: el.Product.image_url,
          Quantity: el.quantity,
          TotalPrice: el.Product.price * el.quantity,
          id: { id: el.id, qty: el.quantity, product: el.Product }
        })
        totalPrice += el.Product.price * el.quantity
      })
      return [cart, totalPrice]
    },
    totalItems () {
      return this.$store.state.cart.length
    },
    rows () {
      return this.cart[0].length
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
.table > tbody > tr > td {
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
