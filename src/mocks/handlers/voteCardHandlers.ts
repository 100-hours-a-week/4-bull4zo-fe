import { HttpResponse, http } from 'msw'
import { voteCreateFailMessage } from '@/lib/messageMap'

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
        groupName: 'MOA AI',
        authorNickname: 'MOA AI',
        content:
          '마이페이지 오른쪽 하단의 코알라 아이콘을 누르면 피드백을 남기실 수 있어요 :)\n\n 피드백으로 남겨주시면 저희가 더욱 잘 확인하고 반영할 수 있습니다.\n\n 투표로 남기기보다는 피드백 기능을 활용해주시면 정말 감사하겠습니다!',
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
        groupName: 'MOA AI',
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
      {
        voteId: 116,
        groupId: Number(finalGroupId),
        authorNickname: '김민수',
        content: '최고의 주말 드라마는?',
        imageUrl:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T10:00:00',
        closedAt: '2025-04-25T10:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 117,
        groupId: Number(finalGroupId),
        authorNickname: '이지은',
        content: '이번 여름에 읽을만한 책 추천!',
        imageUrl:
          'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T11:00:00',
        closedAt: '2025-04-25T11:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 118,
        groupId: Number(finalGroupId),
        authorNickname: '박서준',
        content: '서울에서 가장 맛있는 냉면집은?',
        imageUrl:
          'https://images.unsplash.com/photo-1606857521015-7f1e73a4d46b?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T12:00:00',
        closedAt: '2025-04-25T12:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 119,
        groupId: Number(finalGroupId),
        authorNickname: '윤아',
        content: '이번 주 핫한 영화는?',
        imageUrl:
          'https://images.unsplash.com/photo-1581905764498-9c97c8a0d5ee?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T13:00:00',
        closedAt: '2025-04-25T13:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 120,
        groupId: Number(finalGroupId),
        authorNickname: '정국',
        content: '최고의 운동 루틴은?',
        imageUrl:
          'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T14:00:00',
        closedAt: '2025-04-25T14:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 121,
        groupId: Number(finalGroupId),
        authorNickname: '수지',
        content: '서울 근교 당일치기 여행 추천?',
        imageUrl:
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T15:00:00',
        closedAt: '2025-04-25T15:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 122,
        groupId: Number(finalGroupId),
        authorNickname: '박보검',
        content: '최고의 디저트 카페는?',
        imageUrl:
          'https://images.unsplash.com/photo-1590080876060-4ce0a5a01e57?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T16:00:00',
        closedAt: '2025-04-25T16:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 123,
        groupId: Number(finalGroupId),
        authorNickname: '아이유',
        content: '올해 가장 기대되는 콘서트는?',
        imageUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T17:00:00',
        closedAt: '2025-04-25T17:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 124,
        groupId: Number(finalGroupId),
        authorNickname: '강다니엘',
        content: '최고의 모바일 게임은?',
        imageUrl:
          'https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T18:00:00',
        closedAt: '2025-04-25T18:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 125,
        groupId: Number(finalGroupId),
        authorNickname: '김연아',
        content: '겨울 스포츠 추천!',
        imageUrl:
          'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T19:00:00',
        closedAt: '2025-04-25T19:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 126,
        groupId: Number(finalGroupId),
        authorNickname: '송중기',
        content: '재미있는 보드게임 추천?',
        imageUrl:
          'https://images.unsplash.com/photo-1581091870621-5a00a6cc04b7?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T20:00:00',
        closedAt: '2025-04-25T20:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 127,
        groupId: Number(finalGroupId),
        authorNickname: '장원영',
        content: '최고의 패션 브랜드는?',
        imageUrl:
          'https://images.unsplash.com/photo-1561808844-798d8d72f950?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T21:00:00',
        closedAt: '2025-04-25T21:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 128,
        groupId: Number(finalGroupId),
        authorNickname: '박지훈',
        content: '새로운 취미 추천?',
        imageUrl:
          'https://images.unsplash.com/photo-1549921296-3a6bca12343d?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T22:00:00',
        closedAt: '2025-04-25T22:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 129,
        groupId: Number(finalGroupId),
        authorNickname: '설현',
        content: '최고의 카페 거리 추천?',
        imageUrl:
          'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-22T23:00:00',
        closedAt: '2025-04-25T23:00:00',
        adminVote: 0,
        voteType: 'USER',
      },
      {
        voteId: 130,
        groupId: Number(finalGroupId),
        authorNickname: '차은우',
        content: '올해 가장 기대되는 신제품은?',
        imageUrl:
          'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1600&q=80',
        createdAt: '2025-04-23T00:00:00',
        closedAt: '2025-04-26T00:00:00',
        adminVote: 0,
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
        comments: i % 2 === 0 ? 1 : 0,
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
  http.get('/api/v1/votes/:voteId/review', async ({ params }) => {
    const voteId = params.voteId as string

    const keys = Object.keys(voteCreateFailMessage) as (keyof typeof voteCreateFailMessage)[]
    const randomKey = keys[Math.floor(Math.random() * keys.length)]

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        voteId: Number(voteId),
        reviewReason: randomKey,
      },
    })
  }),
  http.patch(`/api/v1/votes/:voteId`, async ({ request }) => {
    const body = await request.json()

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: body,
      },
      { status: 200 },
    )
  }),
  http.delete(`/api/v1/votes/:voteId`, async ({ params }) => {
    const voteId = params.voteId as string
    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        voteId: Number(voteId),
      },
      status: 200,
    })
  }),
]
