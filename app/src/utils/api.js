import axios from 'axios'
import session from './session'

const devAddress = 'http://localhost:8888/.netlify/functions/api'
const prodAddress = '.netlify/functions/api/'

const api = axios.create({
  baseURL: import.meta.env.DEV ? devAddress : prodAddress,
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

export default api 