import { useQuery } from '@tanstack/react-query'
import { userService } from './service'

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: userService.getUserInfo,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
