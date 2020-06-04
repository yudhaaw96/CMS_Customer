<template>
  <b-navbar toggleable="lg" type="light" variant="info">
    <b-navbar-brand
      ><b-button @click="goToHomeRoute" variant="info" size="lg"
        >E-Commerce</b-button
      ></b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          ><b-button v-if="!isSignedIn" @click="goToSignInRoute" variant="light"
            >Sign In</b-button
          ></b-nav-item
        >
        <b-nav-item
          ><b-button v-if="!isSignedIn" @click="goToSignUpRoute" variant="light"
            >Sign Up</b-button
          ></b-nav-item
        >
        <b-nav-item
          ><b-button @click="goToHomeRoute" variant="light"
            >Home</b-button
          ></b-nav-item
        >
        <b-nav-item
          ><b-button
            v-if="isSignedIn"
            @click="showMsgBoxSignOut"
            variant="danger"
            >Sign Out</b-button
          ></b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar',
  methods: {
    goToHomeRoute () {
      this.$router.push('/')
    },
    goToSignInRoute () {
      this.$router.push('/signin')
    },
    goToSignUpRoute () {
      this.$router.push('/signup')
    },
    showMsgBoxSignOut () {
      this.$bvModal
        .msgBoxConfirm('Are you sure want to sign out?', {
          okVariant: 'danger',
          okTitle: 'Sign Me Out'
        })
        .then(value => {
          this.boxOne = value
          if (value === true) {
            this.signOutUser()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    signOutUser () {
      this.$store.commit('SET_SIGNED_IN', false)
      localStorage.clear()
    }
  },
  computed: {
    isSignedIn () {
      return this.$store.state.isSignedIn
    }
  }
}
</script>

<style></style>
