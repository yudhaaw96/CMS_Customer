<template>
  <div class="container content">
     <router-view />
  </div>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      currentRoute: window.location.pathname
    }
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_SIGNED_IN', true)
      if (this.path === '/signin' || this.path === '/signup') {
        this.$router.push('/')
      }
    } else {
      this.$store.commit('SET_SIGNED_IN', false)
      if (this.path !== '/signin' || this.path !== '/signup') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>

<style scope>
.content {
  margin-top: 50px;
  margin-bottom: 75px;
}
</style>
