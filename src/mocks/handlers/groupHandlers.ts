import { HttpResponse, http } from 'msw'
import { GroupRoleChangeRequest, UpdateGroupRequest } from '@/api/services/group/model'

const fullGroupList = [
  { groupId: 1, name: '공개' },
  { groupId: 2, name: '그룹A' },
  { groupId: 3, name: '카테부' },
  { groupId: 4, name: '테스트' },
  { groupId: 5, name: '프로젝트' },
  { groupId: 6, name: '그룹B' },
  { groupId: 7, name: '그룹C' },
  { groupId: 8, name: '그룹D' },
  { groupId: 9, name: '그룹E' },
  { groupId: 10, name: '그룹F' },
  { groupId: 11, name: '그룹G' },
  { groupId: 12, name: '그룹H' },
  { groupId: 13, name: '그룹I' },
  { groupId: 14, name: '그룹J' },
  { groupId: 15, name: '그룹K' },
]

const allMockVotes = Array.from({ length: 30 }, (_, i) => {
  const voteId = 1000 + i
  const createdAt = new Date(2025, 3, 30, 23, 59, 59 + i)
  return {
    voteId,
    groupId: 3,
    content: `Mock 투표 ${i + 1}`,
    createdAt: createdAt.toISOString(),
    closedAt: new Date(createdAt.getTime() + 3600 * 1000).toISOString(),
    results: [
      {
        optionNumber: 1,
        count: Math.floor(Math.random() * 50),
        ratio: Math.floor(Math.random() * 100),
      },
      {
        optionNumber: 2,
        count: Math.floor(Math.random() * 50),
        ratio: Math.floor(Math.random() * 100),
      },
    ],
  }
})

export const groupHandlers = [
  http.get('/api/v1/user/groups/labels', ({ request }) => {
    const url = new URL(request.url, 'http://localhost:5173')
    const cursor = url.searchParams.get('cursor')
    const size = parseInt(url.searchParams.get('size') || '10', 10)
    const auth = request.headers.get('Authorization')

    if (!auth || !auth.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    let startIndex = 0
    if (cursor) {
      const index = fullGroupList.findIndex((group) => `${group.name}_${group.groupId}` === cursor)
      if (index === -1) {
        return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
      }
      startIndex = index + 1
    }

    const paginated = fullGroupList.slice(startIndex, startIndex + size)
    const last = paginated.at(-1)

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groups: paginated,
        nextCursor: last ? `${last.name}_${last.groupId}` : null,
        hasNext: startIndex + size < fullGroupList.length,
        size: paginated.length,
      },
    })
  }),
  http.get('/api/v1/user/groups', ({ request }) => {
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

    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const sizeParam = url.searchParams.get('size')
    const size = sizeParam ? parseInt(sizeParam) : 10

    const allGroups = Array.from({ length: 15 }, (_, i) => ({
      groupId: i + 3,
      name: `그룹${i + 1}`,
      description: `테스트 그룹 ${i + 1} 설명입니다.`,
      imageUrl: '',
      inviteCode: `CODE${i + 1}`,
      role: i % 3 === 0 ? 'OWNER' : i % 3 === 1 ? 'MANAGER' : 'MEMBER',
    }))

    let startIndex = 0
    if (cursor) {
      const index = allGroups.findIndex((group) => `${group.name}_${group.groupId}` === cursor)
      if (index === -1) {
        return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
      }
      startIndex = index + 1
    }

    const paginated = allGroups.slice(startIndex, startIndex + size)
    const last = paginated.at(-1)

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groups: paginated,
        nextCursor: last ? `${last.name}_${last.groupId}` : null,
        hasNext: startIndex + size < allGroups.length,
        size: paginated.length,
      },
    })
  }),
  http.post('/api/v1/groups/join', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    type JoinRequestBody = {
      inviteCode: string
    }

    const body = (await request.json()) as JoinRequestBody
    const inviteCode = body.inviteCode

    if (inviteCode) {
      return HttpResponse.json(
        {
          message: 'SUCCESS',
          data: {
            groupId: 7,
            groupName: '카테부',
            role: 'MEMBER',
          },
        },
        { status: 201 },
      )
    }

    return HttpResponse.json({ message: 'INVITE_CODE_NOT_FOUND', data: null }, { status: 404 })
  }),
  http.post('/api/v1/groups', async ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'NO_TOKEN', data: null }, { status: 401 })
    }

    type CreateGroupRequest = {
      name: string
      description: string
      imageUrl: string
    }

    const body = (await request.json()) as CreateGroupRequest
    const { name, description, imageUrl } = body

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          groupId: 17,
          name,
          description,
          imageUrl,
          inviteCode: 'ABC123',
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    )
  }),
  http.delete('/api/v1/groups/:groupId/members/me', ({ params }) => {
    const { groupId } = params

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groupId: parseInt(groupId as string, 10),
      },
    })
  }),
  http.get('/api/v1/groups/:groupId', ({ params }) => {
    const { groupId } = params

    if (groupId === '2') {
      return HttpResponse.json(
        {
          message: 'FORBIDDEN',
          data: null,
        },
        { status: 403 },
      )
    }
    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groupId: parseInt(groupId as string, 10),
        name: `그룹${groupId}`,
        description: `그룹 ${groupId}의 설명입니다.`,
        imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
        inviteCode: `CODE${groupId}`,
        role: 'OWNER',
      },
    })
  }),
  http.patch('/api/v1/groups/:groupId', async ({ params, request }) => {
    const { groupId } = params

    const body = (await request.json()) as UpdateGroupRequest

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          groupId: parseInt(groupId as string, 10),
          ...body,
        },
      },
      { status: 200 },
    )
  }),
  http.delete('/api/v1/groups/:groupId', ({ params }) => {
    const { groupId } = params

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groupId: parseInt(groupId as string, 10),
      },
    })
  }),
  http.get('/api/v1/groups/:groupId/members', ({ params }) => {
    const { groupId } = params

    const members = Array.from({ length: 30 }, (_, i) => ({
      userId: i + 1,
      nickname: `사용자${i + 1}`,
      role: i % 3 === 0 ? 'OWNER' : i % 3 === 1 ? 'MANAGER' : 'MEMBER',
    }))

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groupId: parseInt(groupId as string, 10),
        members,
      },
    })
  }),
  http.delete('/api/v1/groups/:groupId/members/:userId', ({ params }) => {
    const { userId } = params

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        userId: parseInt(userId as string, 10),
      },
    })
  }),
  http.patch('/api/v1/groups/:groupId/members/:userId', async ({ params, request }) => {
    const { userId } = params

    const body = (await request.json()) as GroupRoleChangeRequest

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        userId: parseInt(userId as string, 10),
        role: body.role,
      },
    })
  }),
  http.get('/api/v1/groups/:groupId/votes', ({ request, params }) => {
    const url = new URL(request.url)
    const groupId = Number(params.groupId ?? '1')
    const cursor = url.searchParams.get('cursor')
    const size = Number(url.searchParams.get('size') ?? '10')

    // 커서 기반 필터링
    let startIndex = 0
    if (cursor) {
      const index = allMockVotes.findIndex((vote) => {
        return `${vote.createdAt}_${vote.voteId}` === cursor
      })
      if (index === -1) {
        return HttpResponse.json({ message: 'INVALID_CURSOR_FORMAT', data: null }, { status: 400 })
      }
      startIndex = index + 1
    }

    const pagedVotes = allMockVotes.slice(startIndex, startIndex + size)
    const last = pagedVotes.at(-1)

    return HttpResponse.json(
      {
        message: 'SUCCESS',
        data: {
          groupId: groupId,
          groupName: 'KTB',
          votes: pagedVotes,
          nextCursor: last ? `${last.createdAt}_${last.voteId}` : null,
          hasNext: startIndex + size < allMockVotes.length,
          size: pagedVotes.length,
        },
      },
      { status: 200 },
    )
  }),
  http.get('/api/v1/groups/:groupId/analysis', ({ params }) => {
    const { groupId } = params

    return HttpResponse.json({
      message: 'SUCCESS',
      data: {
        groupId: parseInt(groupId as string, 10),
        groupName: 'KTB',
        weekStartDate: '2025-01-01',
        analysis: {
          summaryText: '이번주 KTB 그룹의 활동은 활발합니다. 많은 투표와 의견 교환이 있었습니다.',
        },
        participationStats: {
          participated: 31.7,
          notParticipated: 68.3,
        },
      },
    })
  }),
]
