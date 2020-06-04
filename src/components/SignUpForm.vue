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
      ><img src="@/assets/signup.jpg" width="70%"
    /></b-col>
    <b-col cols="12" sm="12" md="6" lg="4">
      <h1 class="text-primary">E-Commerce</h1>
      <h3 class="text-primary">Sign Up</h3>
      <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
      <div v-if="signupFailed">
        <p
          v-for="(message, index) in signupFailedMessage"
          :key="index"
          class="text-danger"
        >
          {{ message.message }}
        </p>
      </div>
      <b-form @submit.prevent="signup">
        <b-form-group id="input-group-0" label-for="input-0">
          <b-form-input
            id="input-0"
            v-model="name"
            required
            placeholder="your name"
          ></b-form-input>
        </b-form-group>
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

        <b-button type="submit" variant="primary">Sign Un</b-button>
      </b-form></b-col
    >
  </b-row>
</template>

<script>
export default {
  name: 'SignUpForm',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      signupFailed: false,
      signupFailedMessage: ''
    }
  },
  methods: {
    signup () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.loading = true
      this.signupFailed = false
      this.signupFailedMessage = ''
      this.$store
        .dispatch('signup', payload)
        .then(({ data }) => {
          this.loading = false
          this.$swal.fire('Success!', 'Success register!', 'success')
          this.$router.push('/signin')
        })
        .catch(err => {
          console.log(err.response)
          this.loading = false
          this.signupFailed = true
          this.signupFailedMessage = ''
          const manyError = Array.isArray(err.response.data.message)
          const arr = []
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              arr.push(err.response.data.message[i])
            }
            this.signupFailedMessage = arr
          } else {
            this.signupFailedMessage = [{ message: err.response.data.message }]
          }
        })
    }
  }
}
</script>

<style></style>
