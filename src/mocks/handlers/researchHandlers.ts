import { HttpResponse, http } from 'msw'

export const researchHandlers = [
  http.get('/api/v1/votes/:voteId', ({ params, request }) => {
    const voteId = params.voteId as string
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    if (voteId === '0') {
      return HttpResponse.json(
        {
          message: 'ERROR',
          data: null,
        },
        { status: 404 },
      )
    }
    if (voteId) {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            voteId: 123,
            groupId: 1,
            authorNickname: 'jenny',
            content: '점심 안 먹은 사람?',
            imageUrl: '',
            createdAt: '2025-04-20T12:59:00',
            closedAt: '2025-04-20T13:59:00',
          },
        },
        { status: 200 },
      )
    } else if (voteId === '403') {
      return HttpResponse.json({ message: 'FORBIDDEN', data: null }, { status: 403 })
    } else if (voteId === '404') {
      return HttpResponse.json({ message: 'VOTE_NOT_FOUND', data: null }, { status: 404 })
    } else {
      return HttpResponse.json({ message: 'VOTE_NOT_FOUND', data: null }, { status: 404 })
    }
  }),
  http.get('/api/v1/votes/:voteId/result', ({ params, request }) => {
    const voteId = params.voteId as string
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    if (voteId) {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            voteId: 123,
            userResponse: 2,
            totalCount: 10,
            results: [
              {
                optionNumber: 1,
                count: 3,
                ratio: 30,
              },
              {
                optionNumber: 2,
                count: 7,
                ratio: 70,
              },
            ],
          },
        },
        { status: 200 },
      )
    } else if (voteId === '403') {
      return HttpResponse.json({ message: 'FORBIDDEN', data: null }, { status: 403 })
    } else if (voteId === '404') {
      return HttpResponse.json({ message: 'VOTE_NOT_FOUND', data: null }, { status: 404 })
    } else {
      return HttpResponse.json({ message: 'VOTE_NOT_FOUND', data: null }, { status: 404 })
    }
  }),
]
