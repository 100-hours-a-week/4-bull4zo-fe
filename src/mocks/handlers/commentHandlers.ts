import { HttpResponse, delay, http } from 'msw'
import { CommentCreateRequest } from '@/api/services/comment/model'

export const commentHandlers = [
  http.get('/api/v1/votes/:voteId/comments', ({ params, request }) => {
    const { voteId } = params
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const size = Number(url.searchParams.get('size') ?? '10')

    const totalComments = Array.from({ length: 30 }).map((_, idx) => {
      const commentId = idx + 1
      return {
        commentId,
        content:
          commentId === 3
            ? '이 댓글은 신고가 누적되어 숨김 처리되었습니다.'
            : `테스트 댓글 ${commentId}`,
        authorNickname: `익명${commentId}`,
        createdAt: `2025-04-22T14:${(30 + idx).toString().padStart(2, '0')}:00`,
        isMine: commentId % 2 === 0,
        hidden: commentId === 3,
        reportedByUser: commentId === 3,
      }
    })

    if (cursor && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}_\d+$/.test(cursor)) {
      return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
    }

    let startIndex = 0
    if (cursor) {
      const [createdAt, commentIdStr] = cursor.split('_')
      const commentId = Number(commentIdStr)
      const index = totalComments.findIndex(
        (comment) => comment.createdAt === createdAt && comment.commentId === commentId,
      )
      if (index !== -1) {
        startIndex = index + 1
      }
    }

    const pagedComments = totalComments.slice(startIndex, startIndex + size)
    const last = pagedComments.at(-1)

    const hasNext = startIndex + size < totalComments.length
    const nextCursor = hasNext && last ? `${last.createdAt}_${last.commentId}` : null

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          voteId: Number(voteId),
          comments: pagedComments,
          nextCursor,
          hasNext,
          size: pagedComments.length,
        },
      },
      { status: 200 },
    )
  }),
  http.get('/api/v1/votes/:voteId/comments/poll', async ({ params, request }) => {
    const { voteId } = params
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')

    if (!cursor) {
      await delay(10000)
      return HttpResponse.json({
        message: 'SUCCESS',
        data: {
          voteId: Number(voteId),
          comments: [],
          nextCursor: null,
          hasNext: false,
          size: 0,
        },
      })
    }

    const newComments = Array.from({ length: 5 }).map((_, idx) => {
      const commentId = idx + 100
      return {
        commentId,
        content: `새로운 댓글 ${commentId}`,
        authorNickname: `익명${commentId}`,
        createdAt: `2025-06-10T10:${(10 + idx).toString().padStart(2, '0')}:00`,
        isMine: false,
      }
    })

    const slice = newComments.slice(0, 2)
    const last = slice.at(-1)

    await delay(5000)

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        voteId: Number(voteId),
        comments: slice,
        nextCursor: last ? `${last.createdAt}_${last.commentId}` : 'dummy_cursor',
        hasNext: false,
        size: slice.length,
      },
    })
  }),
  http.post('/api/v1/votes/:voteId/comments', async ({ request }) => {
    const body = (await request.json()) as CommentCreateRequest

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        commentId: 1,
        content: body.content,
        authorNickname: '익명1',
        createdAt: '2025-06-01T12:00:00',
      },
    })
  }),
  http.delete('/api/v1/comments/:commentId', async ({ params }) => {
    const { commentId } = params

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        commentId: Number(commentId),
      },
    })
  }),
]
