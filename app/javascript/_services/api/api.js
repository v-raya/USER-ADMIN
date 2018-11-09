import axios from 'axios'

const api = axios.create({
  baseURL: process.env.COUNTY_ADMIN_APP_JS_API_URL || '/cap/api/',
  timeout: 15000,
})

export default api
