import { authAxiosInstance } from '@/api/axios'
import { CommentListData } from './model'

export const commentService = {
  // GET: 댓글 리스트 페이지 네이션
  async getCommentList(voteId: number, size: number, cursor?: string): Promise<CommentListData> {
    const params = new URLSearchParams()
    if (cursor) params.append('cursor', cursor)
    if (size) params.append('size', size.toString())

    return (await authAxiosInstance.get(`/api/v1/votes/${voteId}/comments?${params.toString()}`))
      .data.data
  },
}
