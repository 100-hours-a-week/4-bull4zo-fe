import { useEffect, useRef, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { Comment } from '@/api/services/comment/model'
import { formatRelativeTime } from '@/utils/time'

export const CommentItem = (comment: Partial<Comment>) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  return (
    <li key={comment.commentId} className="list-none flex flex-col gap-1 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-sm font-semibold">{comment.authorNickname}</h1>
        {comment.isMine && (
          <div className="relative" ref={menuRef}>
            <button onClick={toggleMenu}>
              <HiDotsVertical size={16} />
            </button>
            {open && (
              <div className="absolute right-2 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-400 border z-10 ">
                <button className="rounded-tl-2xl w-full px-3 py-2 text-sm hover:bg-gray-100 text-left">
                  댓글 숨기기
                </button>
                <hr className="text-gray-400" />
                <button className="rounded-b-2xl w-full px-3 py-2 text-sm hover:bg-gray-100 text-left">
                  신고하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <p className=" whitespace-pre-line mb-1">{comment.content}</p>
      <span className="text-xs text-gray">{formatRelativeTime(comment.createdAt!)}</span>
    </li>
  )
}
