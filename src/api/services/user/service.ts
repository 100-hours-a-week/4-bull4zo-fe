import { authAxiosInstance } from '@/api/axios'
import { UserInfoResponse } from './model'

export const userService = {
  async getUserInfo(): Promise<UserInfoResponse> {
    return (await authAxiosInstance.get(`/api/v1/user`)).data
  },
}
