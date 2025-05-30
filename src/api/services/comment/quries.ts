import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { CommentListData } from './model'
import { commentService } from './service'

// 댓글 무한스크롤 호출
export const useInfiniteCommentListQuery = (voteId: number, size: number = 10) => {
  return useInfiniteQuery<CommentListData, AxiosError>({
    queryKey: ['comments', voteId],
    queryFn: ({ pageParam }) =>
      commentService.getCommentList(voteId, size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined
    },
    initialPageParam: undefined,
    enabled: !!voteId,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
  })
}
