<template>
  <b-container>
    <HistoryTable :perPage="perPage" :pageOptions="pageOptions" />
  </b-container>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'

export default {
  name: 'History',
  components: {
    HistoryTable
  },
  data () {
    return {
      perPage: 10,
      pageOptions: [10, 20]
    }
  }
}
</script>

<style></style>
