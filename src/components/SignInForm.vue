<template>
  <b-row
    id="signin"
    class="text-center"
    cols="1"
    cols-sm="1"
    cols-md="2"
    cols-lg="2"
    align-v="center"
    align-h="center"
  >
    <b-col cols="12" sm="12" md="6" lg="8"
      ><img src="@/assets/signin.jpg" width="100%"
    /></b-col>
    <b-col cols="12" sm="12" md="6" lg="4">
      <h1 class="text-primary">E-Commerce</h1>
      <h3 class="text-primary">Sign In</h3>
      <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
      <p v-if="signinFailed" class="text-danger">{{ signinFailedMessage }}</p>
      <b-form @submit.prevent="signin">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="email"
            required
            placeholder="your@email.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            required
            placeholder="*******"
            autocomplete="on"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Sign In</b-button>
      </b-form></b-col
    >
  </b-row>
</template>

<script>
export default {
  name: 'SignInForm',
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      signinFailed: false,
      signinFailedMessage: ''
    }
  },
  methods: {
    signin () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.loading = true
      this.signinFailed = false
      this.signinFailedMessage = ''
      this.$store
        .dispatch('signin', payload)
        .then(({ data }) => {
          this.loading = false
          localStorage.setItem('access_token', data.access_token)
          this.$store.commit('SET_SIGNED_IN', true)
          this.$router.push('/')
        })
        .catch(err => {
          this.loading = false
          this.signinFailed = true
          this.signinFailedMessage += err.response.data.message
        })
    }
  }
}
</script>

<style></style>
