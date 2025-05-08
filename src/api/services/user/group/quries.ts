import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyGroupList, MyGroupNamesData } from './model'
import { groupService } from './service'

// 그룹 이름 무한스크롤 조회
export const useInfiniteGroupNameListQuery = (size: number = 10) => {
  return useInfiniteQuery<MyGroupNamesData, AxiosError>({
    queryKey: ['groupNameList'],
    queryFn: ({ pageParam }) => groupService.groupNameList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
// 그룹 정보 무한스크롤 조회
export const useInfiniteGroupsQuery = (size: number = 10) => {
  return useInfiniteQuery<MyGroupList, Error>({
    queryKey: ['myGroups'],
    queryFn: ({ pageParam }) => groupService.getAllGroupList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage.nextCursor : undefined
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 15,
  })
}
// 초대 코드로 그룹 가입
export const useInviteCodeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: groupService.joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
    },
  })
}
// 그룹 생성
export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myGroups'] })
    },
  })
}
