import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

const base = axios.create({
  baseURL: `api/`,

  // For local
  // baseURL: `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENV_URL}`,
  // baseURL: 'http://localhost:8081/',
})

export default base
