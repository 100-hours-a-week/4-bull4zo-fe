import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { CustomQueryOptions } from '@/api/type'
import { UserInfo } from './model'
import { userService } from './service'

// 유저 정보 조회
export const useUserInfoQuery = (options?: CustomQueryOptions<UserInfo>) => {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: userService.getUserInfo,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    ...options,
  })
}
// 유저 정보 수정
export const useUserUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
// 유저 로그아웃
export const useUserLogoutMutation = () => {
  return useMutation({
    mutationFn: userService.logout,
  })
}
// 유저 탈퇴
export const useUserDeleteMutation = () => {
  return useMutation({
    mutationFn: userService.deleteUser,
  })
}
// 유저 피드백
export const useUserFeedbackMutation = () => {
  return useMutation({
    mutationFn: userService.userFeedback,
  })
}
