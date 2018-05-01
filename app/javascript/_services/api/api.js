import axios from 'axios';

const api = axios.create({
  baseURL: process.env.COUNTY_ADMIN_APP_JS_API_URL || '/county_admin/api/',
  timeout: 15000,
});

export default api;
