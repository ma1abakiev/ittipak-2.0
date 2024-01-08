import axios from 'axios'
import { AuthState } from '../../pages/User/types/type'

export const API_URL = `http://localhost:8000/api/user/`

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

// Добавим флаг, чтобы избежать бесконечной петли при обновлении токена
let isRefreshing = false

$api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  }

  // Если токена нет, выполним запрос на обновление токена
  try {
    if (!isRefreshing) {
      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh')
      const response = await axios.post(
        'http://localhost:8000/api/user/token/refresh/',
        { refresh: refreshToken }
      )

      localStorage.setItem('token', response.data.access)
      config.headers.Authorization = `Bearer ${response.data.access}`

      return config
    }
  } catch (error) {
    console.error('Произошла ошибка при обновлении токена:', error)
    console.log('НЕ АВТОРИЗОВАН')
  } finally {
    isRefreshing = false
  }

  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    if (
      error.response &&
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      const originalRequest = error.config
      originalRequest._isRetry = true
      try {
        const token = JSON.parse(
          localStorage.getItem('user') || '{}'
        ) as AuthState
        if (token) {
          const response = await axios.post(
            'http://localhost:8000/api/user/token/refresh/',
            { refresh: localStorage.getItem('refresh') }
          )
          localStorage.setItem('token', response.data.access)
          return $api.request(originalRequest)
        }
      } catch (e) {
        console.error('Произошла ошибка при обновлении токена:', e)
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export default $api
