import { PageNation } from '@/type'

// 댓글의 기본 데이터
export interface Comment {
  commentId: number
  content: string
  authorNickname: string
  createdAt: string
  isMine: boolean
  hidden: boolean
  reportedByUser: boolean
}

// 댓글 리스트 페이지네이션 데이터
export type CommentListData = PageNation<'comments', Comment[]> & {
  voteId: number
}

// 댓글 생성 Request
export interface CommentCreateRequest {
  content: string
  anonymous: boolean
}

// 댓글 생성 Response
export interface CommentCreateResponse {
  commentId: number
  content: string
  authorNickname: string
  createdAt: string
}
