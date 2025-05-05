import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyGroupList, MyGroupNamesResponse } from './model'
import { groupService } from './service'

// 그룹 이름 무한스크롤 조회
export const useInfiniteGroupListQuery = (size: number = 10) => {
  return useInfiniteQuery<MyGroupNamesResponse, AxiosError>({
    queryKey: ['groupNameList'],
    queryFn: ({ pageParam }) => groupService.groupNameList(size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined
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
