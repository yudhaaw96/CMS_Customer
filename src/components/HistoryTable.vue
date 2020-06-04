<template>
  <div>
    <div>
      <h3>
        <font-awesome-icon icon="cubes" /> Purchased items (total:
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
        :items="cartPaid[0]"
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
        <template v-slot:cell(TotalPrice)="data">
          {{ convertToCurrency(data.value) }}
        </template>
        <template v-slot:cell(id)="data">
          <b-button
            variant="warning"
            @click="getProductBeforeUpdateProduct(data.value)"
            ><font-awesome-icon icon="edit" /> Edit</b-button
          >
          -
          <b-button variant="danger" @click="showMsgBoxDelete(data.value)"
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

    <!-- <div>
      <b-modal
        id="modal-edit"
        ref="modal-edit"
        title="Edit a product"
        header-bg-variant="warning"
        header-text-variant="light"
        footerBgVariant="secondary"
      >
        <FormUpdateProduct
          :selectedProduct="selectedProduct"
          @closeModal="closeModal"
        />
        <template v-slot:modal-footer>
          <div class="w-100 h-auto"></div>
        </template>
      </b-modal>
    </div> -->
  </div>
</template>

<script>
import currency from '@/helpers/currency.js'

export default {
  name: 'HistoryTable',
  props: ['perPage', 'pageOptions'],
  data () {
    return {
      show: false,
      bordered: true,
      filter: null,
      currentPage: 1,
      sortBy: 'Date',
      sortDesc: true,
      fields: [
        { key: 'Date', sortable: true },
        { key: 'Name', sortable: true },
        { key: 'Quantity', sortable: true },
        { key: 'TotalPrice', sortable: true }
      ],
      boxDelete: ''
    }
  },
  methods: {
    fetchCartPaid () {
      this.$store
        .dispatch('fetchcartpaid')
        .then(({ data }) => {
          this.$store.commit('SET_CART_PAID', data.CartPaid)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    convertToCurrency (money) {
      return currency(money)
    }
  },
  computed: {
    cartPaid () {
      const cartPaid = []
      let totalPrice = 0
      this.$store.state.cartPaid.forEach(el => {
        cartPaid.push({
          Date: el.updatedAt,
          Name: el.Product.name,
          Quantity: el.quantity,
          TotalPrice: el.Product.price * el.quantity
        })
        totalPrice += el.Product.price * el.quantity
      })
      return [cartPaid, totalPrice]
    },
    totalItems () {
      return this.$store.state.cartPaid.length
    },
    rows () {
      return this.cartPaid[0].length
    }
  },
  created () {
    this.fetchCartPaid()
  }
}
</script>

<style></style>
