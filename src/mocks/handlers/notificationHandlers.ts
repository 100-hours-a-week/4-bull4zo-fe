import { HttpResponse, http } from 'msw'
import { NotificationType } from '@/api/services/notification/model'
import { notificationMessageMap } from '@/lib/messageMap'

const mockNotifications = Array.from({ length: 40 }, (_, i) => {
  const baseTime = new Date('2025-04-25T13:30:00')
  const createdAt = new Date(baseTime.getTime() - i * 60 * 60 * 1000).toISOString().slice(0, 19)

  const types: NotificationType[] = [
    'MY_VOTE_CLOSED',
    'SUBMITTED_VOTE_CLOSED',
    'VOTE_APPROVED',
    'VOTE_REJECTED',
    'MY_VOTE_COMMENT',
    'TOP3_UPDATED',
  ]

  const type = types[i % types.length]

  return {
    notificationId: 123 - i,
    type,
    content: notificationMessageMap[type],
    read: 0,
    redirectUrl: `https://localhost:5173/vote/${123 - i}`,
    createdAt,
  }
})

export const notificationHandlers = [
  http.get('/api/v1/notifications', ({ request }) => {
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const size = Number(url.searchParams.get('size') ?? '20')
    const authHeader = request.headers.get('Authorization')

    // 인증 검증
    if (!authHeader) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    if (cursor && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}_\d+$/.test(cursor)) {
      return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
    }

    const startIndex = cursor
      ? mockNotifications.findIndex((n) => `${n.createdAt}_${n.notificationId}` === cursor) + 1
      : 0

    const paged = mockNotifications.slice(startIndex, startIndex + size)
    const last = paged.at(-1)
    const hasNext = startIndex + size < mockNotifications.length
    const nextCursor = hasNext && last ? `${last.createdAt}_${last.notificationId}` : null

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          notifications: paged,
          nextCursor,
          hasNext,
          size: paged.length,
        },
      },
      { status: 200 },
    )
  }),
  http.patch('/api/v1/notifications/:notificationId/read', ({ params }) => {
    const notificationId = Number(params.notificationId)

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: { notificationId },
      },
      { status: 200 },
    )
  }),
]
