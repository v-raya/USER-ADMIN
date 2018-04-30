import axios from 'axios';

const api = axios.create({
  baseURL: process.env.COG_APP_JS_API_URL || '/cognito/api/',
  timeout: 15000,
});

export default api;
