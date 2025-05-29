export interface Comment {
  commentId: number
  content: string
  authorNickname: string
  createdAt: string
  isMine: boolean
  hidden: boolean
  reportedByUser: boolean
}
