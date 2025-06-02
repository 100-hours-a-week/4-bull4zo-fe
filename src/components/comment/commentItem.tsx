import React, { Dispatch, forwardRef, useEffect, useRef, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { HiDotsVertical } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Comment } from '@/api/services/comment/model'
import { useDeleteCommentMutation } from '@/api/services/comment/queries'
import { formatRelativeTime } from '@/utils/time'

export const CommentItem = forwardRef<HTMLLIElement, Partial<Comment>>((comment, ref) => {
  const { voteId } = useParams()

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
    <li ref={ref} className="list-none flex flex-col gap-1 ">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <FaUserLarge className="text-gray-300" />
          <h1 className="text-sm font-semibold">{comment.authorNickname}</h1>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu}>
            <HiDotsVertical size={16} />
          </button>
          {open && (
            <CommentDotsItem
              isMine={comment.isMine!}
              commentId={comment.commentId!}
              voteId={Number(voteId)}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>
      <p className=" whitespace-pre-line mb-1">{comment.content}</p>
      <span className="text-xs text-gray">{formatRelativeTime(comment.createdAt!)}</span>
      <hr className="border-t border-gray-300 mt-4" />
    </li>
  )
})
const CommentDotsItem = ({
  isMine,
  commentId,
  voteId,
  setOpen,
}: {
  isMine: boolean
  commentId: number
  voteId: number
  setOpen: Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutateAsync } = useDeleteCommentMutation(voteId)

  const handleDelete = async () => {
    await mutateAsync(commentId)
    setOpen(false)
  }
  const handleHide = () => {
    toast.error('이 기능은 현재 준비 중입니다.')
    setOpen(false)
  }
  const handleDeclaration = () => {
    toast.error('이 기능은 현재 준비 중입니다.')
    setOpen(false)
  }

  if (isMine) {
    return (
      <div className="absolute right-2 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-400 border z-10 ">
        <button
          onClick={handleDelete}
          className="rounded-b-2xl cursor-pointer rounded-tl-2xl w-full px-3 py-2 text-sm hover:bg-gray-100 text-left"
        >
          삭제하기
        </button>
      </div>
    )
  } else {
    return (
      <div className="absolute right-2 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-400 border z-10 ">
        <button
          onClick={handleHide}
          className="rounded-tl-2xl cursor-pointer w-full px-3 py-2 text-sm hover:bg-gray-100 text-left"
        >
          댓글 숨기기
        </button>
        <hr className="text-gray-400" />
        <button
          onClick={handleDeclaration}
          className="rounded-b-2xl w-full px-3 cursor-pointer py-2 text-sm hover:bg-gray-100 text-left"
        >
          신고하기
        </button>
      </div>
    )
  }
}
