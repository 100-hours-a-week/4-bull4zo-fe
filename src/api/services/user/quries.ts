import { useMutation, useQuery } from '@tanstack/react-query'
import { userService } from './service'

// 유저 정보 조회
export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUserInfo,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
// 유저 정보 수정
export const useUserUpdateMutation = () => {
  return useMutation({
    mutationFn: userService.updateUser,
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
