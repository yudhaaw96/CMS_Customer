<template>
  <footer class="fixed-bottom bg-info d-flex justify-content-center">
    <p class="text-white font-weight-normal">
      Copyright &copy; {{ year }} E-Commerce | Made with &#10084;.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style></style>
