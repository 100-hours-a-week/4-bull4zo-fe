import { HttpResponse, http } from 'msw'

export const authHandlers = [
  // 로그인 핸들러
  http.post('/api/v1/auth/login/oauth', async ({ request }) => {
    const { provider, code } = (await request.json()) as { provider: string; code: string }

    if (provider === 'kakao' && code) {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            accessToken: 'jwt-access-token',
            userId: 1,
            nickname: '춘식이',
          },
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'refreshToken=refresh-token;',
          },
        },
      )
    }

    if (provider === 'kakao') {
      return HttpResponse.json(
        {
          message: 'AUTH_FAILED',
          data: null,
        },
        { status: 401 },
      )
    }

    return HttpResponse.json(
      {
        message: 'UNEXPECTED_ERROR',
        data: null,
      },
      { status: 500 },
    )
  }),
  // 로그아웃 핸들러
  http.post('/api/v1/auth/logout', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader) {
      return HttpResponse.json(
        {
          message: 'NO_TOKEN',
          data: null,
        },
        { status: 401 },
      )
    }

    const token = authHeader.replace('Bearer ', '').trim()

    if (token === 'jwt-access-token') {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: null,
        },
        { status: 200 },
      )
    }

    if (token === 'already-logged-out-token') {
      return HttpResponse.json(
        {
          message: 'ALREADY_LOGGED_OUT',
          data: null,
        },
        { status: 200 },
      )
    }

    if (token === 'expired-token') {
      return HttpResponse.json(
        {
          message: 'TOKEN_EXPIRED',
          data: null,
        },
        { status: 401 },
      )
    }

    if (token === 'invalid-token') {
      return HttpResponse.json(
        {
          message: 'INVALID_TOKEN',
          data: null,
        },
        { status: 401 },
      )
    }

    if (token === 'user-not-found-token') {
      return HttpResponse.json(
        {
          message: 'USER_NOT_FOUND',
          data: null,
        },
        { status: 401 },
      )
    }
    return HttpResponse.json(
      {
        message: 'UNEXPECTED_ERROR',
        data: null,
      },
      { status: 500 },
    )
  }),
  // 리프레시 토큰 재발급 핸들러
  http.post('/api/v1/auth/refresh', async ({ cookies }) => {
    const refreshToken = cookies.refreshToken

    if (!refreshToken) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    if (refreshToken === 'refresh-token') {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            accessToken: 'jwt-access-token',
            expiresIn: 3600,
          },
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': 'refreshToken=refresh-token; HttpOnly; Secure; Path=/; SameSite=Strict',
          },
        },
      )
    }

    if (refreshToken === 'expired-refresh-token') {
      return HttpResponse.json({ message: 'TOKEN_EXPIRED', data: null }, { status: 401 })
    }

    if (refreshToken === 'invalid-refresh-token') {
      return HttpResponse.json({ message: 'INVALID_TOKEN', data: null }, { status: 401 })
    }

    if (refreshToken === 'user-not-found-refresh-token') {
      return HttpResponse.json({ message: 'USER_NOT_FOUND', data: null }, { status: 401 })
    }

    if (refreshToken === 'forbidden-refresh-token') {
      return HttpResponse.json({ message: 'FORBIDDEN', data: null }, { status: 403 })
    }

    return HttpResponse.json({ message: 'UNEXPECTED_ERROR', data: null }, { status: 500 })
  }),
]
