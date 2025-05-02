import { ApiResponse } from '@/lib/type'

export interface UserInfo {
  nickname: string
}
export type UserInfoResponse = ApiResponse<UserInfo>
