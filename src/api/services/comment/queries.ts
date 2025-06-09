import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { CommentCreateRequest, CommentListData } from './model'
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
  })
}
// 댓글 롱 폴링 호출
export const useLongPollingCommentListQuery = (
  voteId: number,
  cursor: string | undefined,
  enabled: boolean = true,
) => {
  return useQuery<CommentListData, AxiosError>({
    queryKey: ['longPollingComments', voteId, cursor],
    queryFn: () => commentService.getLongPollingCommentList(voteId, cursor),
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
// 댓글 생성 호출
export const useCreateCommentMutation = (voteId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CommentCreateRequest) => commentService.createComment(voteId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', voteId] })
    },
  })
}
// 댓글 삭제 호출
export const useDeleteCommentMutation = (voteId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: number) => commentService.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', voteId] })
    },
  })
}
