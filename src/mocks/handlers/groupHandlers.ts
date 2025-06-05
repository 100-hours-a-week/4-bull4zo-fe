import { HttpResponse, http } from 'msw'
import { UpdateGroupRequest } from '@/api/services/group/model'

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

    if (groupId === ' 2') {
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
        imageUrl: '',
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
]
