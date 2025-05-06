import { HttpResponse, http } from 'msw'

export const votesHandlers = [
  http.get('api/v1/votes', ({ request }) => {
    const url = new URL(request.url)
    const groupId = Number(url.searchParams.get('groupId') ?? '1')
    const cursor = url.searchParams.get('cursor')
    const size = Number(url.searchParams.get('size') ?? '10')
    const authHeader = request.headers.get('Authorization')

    const isGuest = !authHeader
    const finalGroupId = isGuest ? '1' : groupId

    const votes = [
      {
        voteId: 101,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘 점심은 무엇을 먹을까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T12:00:00',
        closedAt: '2025-04-21T12:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 102,
        groupId: Number(finalGroupId),
        authorNickname: '김철수',
        content: '주말에 가볼만한 여행지 추천해주세요!',
        imageUrl:
          'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T13:00:00',
        closedAt: '2025-04-22T13:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 103,
        groupId: Number(finalGroupId),
        authorNickname: '이영희',
        content: '다음 주 회식 장소 어디가 좋을까요?',
        imageUrl: '',
        createdAt: '2025-04-20T14:00:00',
        closedAt: '2025-04-23T14:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 104,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '이번 주말 날씨가 좋을까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1501691223387-dd050040b4eb?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T15:00:00',
        closedAt: '2025-04-21T15:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 105,
        groupId: Number(finalGroupId),
        authorNickname: '박지성',
        content: '새로 나온 영화 중 어떤 걸 볼까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T16:00:00',
        closedAt: '2025-04-22T16:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 106,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘의 추천 운동은 무엇일까요?',
        imageUrl: '',
        createdAt: '2025-04-20T17:00:00',
        closedAt: '2025-04-21T17:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 107,
        groupId: Number(finalGroupId),
        authorNickname: '최민수',
        content: '다음 프로젝트 주제로 어떤 게 좋을까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T18:00:00',
        closedAt: '2025-04-23T18:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 108,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘의 추천 책은 무엇일까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T19:00:00',
        closedAt: '2025-04-21T19:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 109,
        groupId: Number(finalGroupId),
        authorNickname: '정다은',
        content: '다음 주 회의 시간은 언제가 좋을까요?',
        imageUrl: '',
        createdAt: '2025-04-20T20:00:00',
        closedAt: '2025-04-22T20:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 110,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘의 추천 음악은 무엇일까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3e27ca4b?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T21:00:00',
        closedAt: '2025-04-21T21:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 111,
        groupId: Number(finalGroupId),
        authorNickname: '강민지',
        content: '다음 주 팀 빌딩 활동으로 뭐가 좋을까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T22:00:00',
        closedAt: '2025-04-23T22:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 112,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘의 추천 커피는 무엇일까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-20T23:00:00',
        closedAt: '2025-04-21T23:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 113,
        groupId: Number(finalGroupId),
        authorNickname: '서준호',
        content: '다음 프로젝트의 기술 스택은 무엇이 좋을까요?',
        imageUrl: '',
        createdAt: '2025-04-21T00:00:00',
        closedAt: '2025-04-24T00:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
      {
        voteId: 114,
        groupId: Number(finalGroupId),
        authorNickname: 'MOA AI',
        content: '오늘의 추천 디저트는 무엇일까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-21T01:00:00',
        closedAt: '2025-04-22T01:00:00',
        adminVote: 0,
        voteType: 'AI',
      },
      {
        voteId: 115,
        groupId: Number(finalGroupId),
        authorNickname: '한지민',
        content: '다음 주 휴가 때 가볼만한 해외 여행지는 어디일까요?',
        imageUrl:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-21T02:00:00',
        closedAt: '2025-04-24T02:00:00',
        adminVote: 1,
        voteType: 'USER',
      },
    ]

    let startIndex = 0
    if (cursor) {
      const index = votes.findIndex((vote) => {
        return `${vote.createdAt}_${vote.voteId}` === cursor
      })
      if (index === -1) {
        return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
      }
      startIndex = index + 1
    }

    const paginated = votes.slice(startIndex, startIndex + size)
    const last = paginated.at(-1)

    const response = {
      message: 'SUCCESS',
      data: {
        votes: paginated,
        nextCursor: last ? `${last.createdAt}_${last.voteId}` : null,
        hasNext: startIndex + size < votes.length,
        size: paginated.length,
      },
    }

    return HttpResponse.json(response, { status: 200 })
  }),
  http.post(`api/v1/votes/:id/submit`, () => {
    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: null,
      },
      { status: 200 },
    )
  }),
  http.post(`api/v1/votes`, async ({ request }) => {
    const body = await request.json()

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: body,
      },
      { status: 200 },
    )
  }),
  http.get('/api/v1/votes/submit', ({ request }) => {
    const url = new URL(request.url)
    const groupId = url.searchParams.get('groupId') ?? 'all'
    const size = Number(url.searchParams.get('size')) || 10

    const allVotes = Array.from({ length: 15 }).map((_, i) => {
      const minRatio = 10
      const yesRatio = Math.floor(Math.random() * (100 - minRatio * 2)) + minRatio
      const noRatio = 100 - yesRatio

      return {
        voteId: 100 + i,
        groupId: Number(groupId) === 1 ? (i % 3) + 1 : Number(groupId),
        content: `샘플 투표 질문 ${i + 1}`,
        createdAt: `2025-04-${String(10 + i).padStart(2, '0')}T12:00:00`,
        closedAt: `2025-04-${String(11 + i).padStart(2, '0')}T18:00:00`,
        results: [
          {
            optionNumber: 1,
            count: Math.floor(Math.random() * 50),
            ratio: yesRatio,
          },
          {
            optionNumber: 2,
            count: Math.floor(Math.random() * 50),
            ratio: noRatio,
          },
        ],
      }
    })

    const votes = allVotes.slice(0, size)

    const last = votes[votes.length - 1]

    const nextCursor = last ? `${last.closedAt}_${last.voteId}` : null

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          votes,
          nextCursor,
          hasNext: allVotes.length > size,
          size: votes.length,
        },
      },
      { status: 200 },
    )
  }),
  http.get('/api/v1/votes/mine', ({ request }) => {
    const url = new URL(request.url)
    const groupId = url.searchParams.get('groupId') ?? 'all'
    const size = Number(url.searchParams.get('size')) || 10

    const allVotes = Array.from({ length: 15 }).map((_, i) => {
      const minRatio = 10
      const yesRatio = Math.floor(Math.random() * (100 - minRatio * 2)) + minRatio
      const noRatio = 100 - yesRatio

      // voteStatus 랜덤 추가
      const statusArray = ['PENDING', 'REJECTED', 'OPEN', 'CLOSED'] as const
      const voteStatus = statusArray[Math.floor(Math.random() * statusArray.length)]

      return {
        voteId: 100 + i,
        groupId: Number(groupId) === 1 ? (i % 3) + 1 : Number(groupId),
        content: `내가 만든 투표 질문 ${i + 1}`,
        voteStatus,
        createdAt: `2025-04-${String(10 + i).padStart(2, '0')}T12:00:00`,
        closedAt: `2025-04-${String(11 + i).padStart(2, '0')}T18:00:00`,
        results:
          voteStatus === 'PENDING' || voteStatus === 'REJECTED'
            ? null
            : [
                {
                  optionNumber: 1,
                  count: Math.floor(Math.random() * 50),
                  ratio: yesRatio,
                },
                {
                  optionNumber: 2,
                  count: Math.floor(Math.random() * 50),
                  ratio: noRatio,
                },
              ],
      }
    })

    const resultVotes = allVotes.slice(0, size)
    const last = resultVotes[resultVotes.length - 1]
    const nextCursor = last ? `${last.createdAt}_${last.voteId}` : null

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          votes: resultVotes,
          nextCursor,
          hasNext: allVotes.length > size,
          size: resultVotes.length,
        },
      },
      { status: 200 },
    )
  }),
]
