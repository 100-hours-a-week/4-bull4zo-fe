import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { MyGroupNamesResponse } from './model'
import { groupService } from './service'

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
