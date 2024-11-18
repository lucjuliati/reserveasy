import axios from 'axios'
import session from './session'

const devAddress = 'http://localhost:8888/.netlify/functions/api'
const prodAddress = '.netlify/functions/api/'

const api = axios.create({
  // baseURL: import.meta.env.DEV ? devAddress : prodAddress,
  baseURL: 'https://reserveasy.netlify.app/.netlify/functions/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  try {
    const token = session.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (err) {
    console.error(err)
  }

  return config
})

api.interceptors.response.use(function (response) {
  return response
}, function (error) {

  if (error?.response?.status) {
    localStorage.clear()

    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return Promise.reject(error)
})

export default api 