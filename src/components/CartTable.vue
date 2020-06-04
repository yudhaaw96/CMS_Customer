<template>
  <div>
    <div>
      <h3>
        <font-awesome-icon icon="cubes" /> Your Cart's items (unpaid:
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
      boxDelete: ''
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
    showMsgBoxDelete (id) {
      this.boxDelete = ''
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete?', {
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
          console.log(err)
        })
    },
    deleteProduct (id) {
      this.$store
        .dispatch('deleteanitem', id)
        .then(({ data }) => {
          const deletedItemName = data.DeletedItem.name
          this.fetchCart()
          this.$swal.fire(
            `Success delete "${deletedItemName}"`,
            'You just deleted an item!',
            'success'
          )
        })
        .catch(({ err }) => {
          console.log(err)
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
          id: { id: el.id, qty: el.quantity }
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

<style></style>
