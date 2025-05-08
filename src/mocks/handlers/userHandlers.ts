import { HttpResponse, http } from 'msw'

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
  http.patch('/api/v1/user', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    // 인증 없으면 401
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    type NicknameRequestBody = {
      nickname: string
    }

    const body = (await request.json()) as NicknameRequestBody
    const nickname = body.nickname

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: { nickname },
      },
      { status: 200 },
    )
  }),
  http.delete('/api/v1/auth/logout', ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: null,
        },
        { status: 200 },
      )
    }

    return HttpResponse.json(
      {
        message: 'NO_TOKEN',
        data: null,
      },
      { status: 401 },
    )
  }),
  http.delete('/api/v1/user', ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          message: 'NO_TOKEN',
          data: null,
        },
        { status: 401 },
      )
    }

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: null,
      },
      { status: 200 },
    )
  }),
  http.post('/api/v1/auth/token/refresh', ({ request }) => {
    const cookieHeader = request.headers.get('cookie') || 'refreshToken=aaa'
    const hasRefreshToken = /refreshToken=([^;]+)/.test(cookieHeader)

    if (!hasRefreshToken) {
      return HttpResponse.json(
        {
          message: 'NO_TOKEN',
          data: null,
        },
        { status: 401 },
      )
    }

    // refreshToken 있으면 accessToken 발급
    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          accessToken: 'mock-access-token-123456',
          expiresIn: 3600,
        },
      },
      { status: 200 },
    )
  }),
]
