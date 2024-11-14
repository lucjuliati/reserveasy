import axios from 'axios'

// export const ADDRESS = 'http://localhost:8888/.netlify/functions/api'
export const ADDRESS = 'https://hilarious-narwhal-ea4884.netlify.app/.netlify/functions/api'

const devAddress = 'http://localhost:8888/.netlify/functions/api'
const prodAddress = 'https://hilarious-narwhal-ea4884.netlify.app/.netlify/functions/api'

const api = axios.create({
  baseURL: import.meta.env.DEV ? devAddress:prodAddress,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const restaurantApi = {
  getAll: (params) => api.get('/restaurants', { params }),
  getById: (id) => api.get(`/restaurants/${id}`),
  checkAvailability: (id, data) => api.post(`/restaurants/${id}/check-availability`, data),
}

export const reservationApi = {
  create: (data) => api.post('/reservations', data),
  getMyReservations: () => api.get('/reservations/my-reservations'),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.delete(`/reservations/${id}`),
}

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyPhone: (data) => api.post('/auth/verify-phone', data),
}

export default api 