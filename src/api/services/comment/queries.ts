import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { commentKey } from './key'
import { CommentCreateRequest, CommentListData } from './model'
import { commentService } from './service'

// 댓글 무한스크롤 호출
export const useInfiniteCommentListQuery = (voteId: number, size: number = 10) => {
  return useSuspenseInfiniteQuery<CommentListData, AxiosError>({
    queryKey: commentKey(voteId),
    queryFn: ({ pageParam }) =>
      commentService.getCommentList(voteId, size, pageParam as string | undefined),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined
    },
    initialPageParam: undefined,
  })
}
// 댓글 생성 호출
export const useCreateCommentMutation = (voteId: number) => {
  return {
    mutationFn: (payload: CommentCreateRequest) => {
      return commentService.createComment(voteId, payload)
    },
  }
}
// 댓글 삭제 호출
export const useDeleteCommentMutation = {
  mutationFn: (commentId: number) => {
    return commentService.deleteComment(commentId)
  },
}
