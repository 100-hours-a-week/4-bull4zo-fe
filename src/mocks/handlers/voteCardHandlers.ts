import { HttpResponse, http } from 'msw'

export const votesHandlers = [
  http.get('/votes', ({ request }) => {
    const url = new URL(request.url)
    const groupId = url.searchParams.get('groupId') ?? 'all'
    const cursor = url.searchParams.get('cursor')
    const size = Number(url.searchParams.get('size')) || 10
    const authHeader = request.headers.get('Authorization')

    const isGuest = !authHeader
    const finalGroupId = isGuest ? '1' : groupId
    const finalSize = isGuest ? 3 : size

    if (
      cursor &&
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}_\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(cursor)
    ) {
      return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
    }

    const votes = Array.from({ length: finalSize }).map((_, i) => ({
      voteId: 100 + i,
      groupId: Number(finalGroupId),
      authorNickname: 'MOA AI',
      content: `샘플 투표 ${i + 1}`,
      imageUrl: '',
      createdAt: '2025-04-20T12:00:00',
      closedAt: '2025-04-21T12:00:00',
      adminVote: 0,
      voteType: 'AI',
    }))

    const response = {
      message: 'SUCCESS',
      data: {
        votes,
        nextCursor: votes.length > 0 ? '2025-04-24T12:00:00_2025-04-22T10:00:00' : null,
        hasNext: true,
        size: votes.length,
      },
    }

    return HttpResponse.json(response, { status: 200 })
  }),
]
