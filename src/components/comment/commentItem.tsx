import React, { Dispatch, forwardRef, useEffect, useRef, useState } from 'react'
import { FaUserLarge } from 'react-icons/fa6'
import { HiDotsVertical } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Comment, CommentListData } from '@/api/services/comment/model'
import { commentKey, useDeleteCommentMutation } from '@/api/services/comment/queries'
import { formatRelativeTime } from '@/utils/time'

interface CommentItemProps extends Partial<Comment> {
  // eslint-disable-next-line no-unused-vars
  onDelete?: (commentId: number) => void
}

export const CommentItem = forwardRef<HTMLLIElement, CommentItemProps>((comment, ref) => {
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
          <button onClick={toggleMenu} aria-label="댓글 메뉴 열기">
            <HiDotsVertical size={16} />
          </button>
          {open && (
            <CommentDotsItem
              isMine={comment.isMine!}
              commentId={comment.commentId!}
              voteId={Number(voteId)}
              setOpen={setOpen}
              onDelete={comment.onDelete}
            />
          )}
        </div>
      </div>
      <p className=" whitespace-pre-line mb-1">{comment.content}</p>
      <span className="text-xs text-gray">
        {formatRelativeTime(comment.createdAt!).includes('종료')
          ? '0분 전'
          : formatRelativeTime(comment.createdAt!)}
      </span>
      <hr className="border-t border-gray-300 mt-4" />
    </li>
  )
})
const CommentDotsItem = ({
  isMine,
  commentId,
  voteId,
  setOpen,
  onDelete,
}: {
  isMine: boolean
  commentId: number
  voteId: number
  setOpen: Dispatch<React.SetStateAction<boolean>>
  // eslint-disable-next-line no-unused-vars
  onDelete?: (commentId: number) => void
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    ...useDeleteCommentMutation,
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: commentKey(voteId) })

      const previousComments = queryClient.getQueryData<InfiniteData<CommentListData>>(
        commentKey(voteId),
      )

      queryClient.setQueryData<InfiniteData<CommentListData>>(commentKey(voteId), (old) => {
        if (!old) return old

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            comments: page.comments.filter((comment) => comment.commentId !== commentId),
          })),
        }
      })

      return { previousComments }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKey(voteId), context.previousComments)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentKey(voteId) })
    },
  })

  const handleDelete = async () => {
    await mutateAsync(commentId)
    onDelete?.(commentId)
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
      <div className="absolute right-2 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-300 border z-10 ">
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
      <div className="absolute right-2 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-300 border z-10 ">
        <button
          onClick={handleHide}
          className="rounded-tl-2xl cursor-pointer w-full px-3 py-2 text-sm hover:bg-gray-100 text-left"
        >
          댓글 숨기기
        </button>
        <hr className="text-gray-300" />
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
