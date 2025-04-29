import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { userService } from './services/user/service'

// auth 인증 없이 사용하는 axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
// auth 인증 후 사용하는 axios 인스턴스
export const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
// 메모리에 저장된 accessToken 추가 로직
authAxiosInstance.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
// refreshToken 재발급 로직
authAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config

    if (error.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true

      try {
        const { accessToken } = await userService.refreshAccessToken()

        useUserStore.getState().setAccessToken(accessToken)

        originRequest.headers.Authorization = `Bearer ${accessToken}`

        return authAxiosInstance(originRequest)
      } catch (e) {
        useUserStore.getState().logout()
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)
