import { useInfiniteQuery } from '@tanstack/react-query'
import { groupService } from './service'

export const useInfiniteGroupListQuery = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['groupNameList'],
    queryFn: ({ pageParam = undefined }: { pageParam: string | undefined }) =>
      groupService.groupNameList(size, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.hasNext ? lastPage.data.nextCursor : undefined
    },
    staleTime: 1000 * 60 * 15,
    initialPageParam: undefined,
  })
}
