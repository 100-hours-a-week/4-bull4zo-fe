import { CustomQueryOptions } from '@/api/type'
import { userKey } from './key'
import { UserFeedbackRequest, UserInfo } from './model'
import { userService } from './service'

// 유저 정보 조회 options
export const userQueryOptions = (options?: CustomQueryOptions<UserInfo>) => ({
  queryKey: userKey(),
  queryFn: userService.getUserInfo,
  staleTime: 1000 * 60 * 5,
  retry: 1,
  ...options,
})

// 유저 정보 수정 mutation
export const useUserUpdateMutation = {
  mutationFn: (payload: UserInfo) => userService.updateUser(payload),
}
// 유저 로그아웃 mutation
export const useUserLogoutMutation = {
  mutationFn: () => userService.logout(),
}
// 유저 탈퇴 mutation
export const useUserDeleteMutation = {
  mutationFn: () => userService.deleteUser(),
}
// 유저 피드백 mutation
export const useUserFeedbackMutation = {
  mutationFn: (payload: UserFeedbackRequest) => userService.userFeedback(payload),
}
