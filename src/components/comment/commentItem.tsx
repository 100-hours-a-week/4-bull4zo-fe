import { HiDotsVertical } from 'react-icons/hi'
import { Comment } from '@/api/services/comment/model'
import { formatRelativeTime } from '@/utils/time'

export const CommentItem = (comment: Partial<Comment>) => {
  return (
    <li key={comment.commentId} className="list-none flex flex-col gap-1 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-sm">{comment.authorNickname}</h1>
        {comment.isMine && <HiDotsVertical size={24} />}
      </div>
      <p className=" whitespace-pre-line mb-1">{comment.content}</p>
      <span className="text-xs text-gray">{formatRelativeTime(comment.createdAt!)}</span>
    </li>
  )
}
