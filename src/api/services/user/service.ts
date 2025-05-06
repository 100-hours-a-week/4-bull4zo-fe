import { authAxiosInstance } from '@/api/axios'
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
}
