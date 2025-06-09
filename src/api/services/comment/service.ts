import { authAxiosInstance } from '@/api/axios'
import { CommentCreateRequest, CommentCreateResponse, CommentListData } from './model'

export const commentService = {
  // GET: 댓글 리스트 페이지 네이션
  async getCommentList(voteId: number, size: number, cursor?: string): Promise<CommentListData> {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/${voteId}/comments?${params.toString()}`))
      .data.data
  },
  // GET: 댓글 롱 폴링
  async getLongPollingCommentList(
    voteId: number,
    cursor: string | undefined,
  ): Promise<CommentListData> {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    return (
      await authAxiosInstance.get(`/api/v1/votes/${voteId}/comments/poll?${params.toString()}`)
    ).data.data
  },
  // POST: 댓글 생성
  async createComment(
    voteId: number,
    payload: CommentCreateRequest,
  ): Promise<CommentCreateResponse> {
    const response = await authAxiosInstance.post(`/api/v1/votes/${voteId}/comments`, payload)
    return response.data.data
  },
  // DELETE: 댓글 삭제
  async deleteComment(commentId: number): Promise<void> {
    const response = await authAxiosInstance.delete(`/api/v1/comments/${commentId}`)
    return response.data.data
  },
}
