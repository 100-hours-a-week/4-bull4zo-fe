import { commentKey } from './key'
import { CommentCreateRequest, CommentListData } from './model'
import { commentService } from './service'

// 댓글 리스트 조회 options
export const infiniteCommentQueryOptions = (voteId: string, size: number = 10) => ({
  queryKey: commentKey(voteId),
  queryFn: ({ pageParam }: { pageParam?: string }) =>
    commentService.getCommentList(Number(voteId), size, pageParam as string | undefined),
  getNextPageParam: (lastPage: CommentListData) => {
    return lastPage.hasNext ? lastPage.nextCursor : undefined
  },
  initialPageParam: undefined,
})
// 댓글 생성 mutation
export const useCreateCommentMutation = (voteId: number) => {
  return {
    mutationFn: (payload: CommentCreateRequest) => {
      return commentService.createComment(voteId, payload)
    },
  }
}
// 댓글 삭제 mutation
export const useDeleteCommentMutation = {
  mutationFn: (commentId: number) => {
    return commentService.deleteComment(commentId)
  },
}
