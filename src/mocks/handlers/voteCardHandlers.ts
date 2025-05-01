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

    if (
      cursor &&
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}_\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(cursor)
    ) {
      return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
    }

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

    const response = {
      message: 'SUCCESS',
      data: {
        votes: votes.slice(0, size),
        nextCursor: votes.length > size ? '2025-04-24T12:00:00_2025-04-22T10:00:00' : null,
        hasNext: votes.length > size,
        size: Math.min(size, votes.length),
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
]
