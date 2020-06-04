<template>
  <b-container>
    <CartTable :perPage="perPage" :pageOptions="pageOptions" />
  </b-container>
</template>

<script>
import CartTable from '@/components/CartTable.vue'

export default {
  name: 'Cart',
  components: {
    CartTable
  },
  data () {
    return {
      perPage: 5,
      pageOptions: [5, 10]
    }
  }
}
</script>

<style></style>
