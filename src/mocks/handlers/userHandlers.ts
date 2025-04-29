import { http, HttpResponse } from 'msw'

export const userHandlers = [
  http.get('/api/v1/user', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '').trim()

    if (token === 'jwt-access-token') {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            nickname: '하와이에서온시나몬롤',
          },
        },
        { status: 200 },
      )
    }

    if (token === 'expired-access-token') {
      return HttpResponse.json({ message: 'TOKEN_EXPIRED', data: null }, { status: 401 })
    }

    if (token === 'invalid-access-token') {
      return HttpResponse.json({ message: 'INVALID_TOKEN', data: null }, { status: 401 })
    }

    if (token === 'user-not-found-access-token') {
      return HttpResponse.json({ message: 'USER_NOT_FOUND', data: null }, { status: 401 })
    }

    return HttpResponse.json({ message: 'UNEXPECTED_ERROR', data: null }, { status: 500 })
  }),
]
