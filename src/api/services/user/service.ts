import { authAxiosInstance, axiosInstance } from '@/api/axios'
import { UserInfo } from './model'

export const userService = {
  async getUserInfo(): Promise<UserInfo> {
    return (await authAxiosInstance.get(`/api/v1/user`)).data.data
  },
  async updateUser(payload: UserInfo): Promise<UserInfo> {
    const response = await authAxiosInstance.patch(`/api/v1/user`, payload)

    return response.data.data
  },
  async logout(): Promise<void> {
    await authAxiosInstance.delete(`/api/v1/auth/logout`)
    return
  },
  async deleteUser(): Promise<void> {
    await authAxiosInstance.delete(`/api/v1/user`)
    return
  },
  async refreshAccessToken() {
    const response = await axiosInstance.post(`/api/v1/auth/token/refresh`)

    if (response.data.message === 'SUCCESS') {
      return response.data.data
    } else {
      throw new Error('리프레쉬 토큰 재발급 실패')
    }
  },
}
