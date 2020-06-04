import axios from 'axios'

// const url = 'http://localhost:3000'
const url = 'https://server-cms-ecommerce-yudhaaw96.herokuapp.com/'

const axiosShot = axios.create({
  baseURL: url
})

export default axiosShot
