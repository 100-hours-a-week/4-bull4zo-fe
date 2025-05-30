import { HttpResponse, http } from 'msw'

export const commentHandlers = [
  http.get('/api/v1/votes/:voteId/comments', ({ params, request }) => {
    const { voteId } = params
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const sizeParam = url.searchParams.get('size')
    const size = sizeParam ? parseInt(sizeParam) : 10

    // 커서 형식 검증 예시
    if (cursor && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}_\d+$/.test(cursor)) {
      return HttpResponse.json(
        {
          message: 'INVALID_CURSOR_FORMAT',
          data: null,
        },
        { status: 400 },
      )
    }

    const comments = Array.from({ length: size }).map((_, idx) => {
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

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          voteId: Number(voteId),
          comments,
          nextCursor: `2025-04-22T14:40:00_${comments.length + 1}`,
          hasNext: comments.length === size,
          size: comments.length,
        },
      },
      { status: 200 },
    )
  }),
]
