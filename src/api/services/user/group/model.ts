export interface GroupName {
  groupId: number
  name: string
}
export interface Group {
  groupId: number
  name: string
  description: string
  imageUrl: string
  inviteCode: string
  role: GroupRole
}

export type GroupRole = 'OWNER' | 'MANAGER' | 'MEMBER'

export interface MyGroupNamesData {
  groups: GroupName[]
  nextCursor: string | null
  hasNext: boolean
  size: number
}

export interface MyGroupList {
  groups: Group[]
  nextCursor: string | null
  hasNext: boolean
  size: number
}

export interface InviteCodePayload {
  inviteCode: string
}

export interface InviteGroupData {
  groupId: number
  groupName: string
  role: GroupRole
}

export interface CreateGroupPayload {
  name: string
  description: string
  imageUrl: string
}

export interface CreateGroupData {
  groupId: number
  name: string
  description: string
  imageUrl: string
  inviteCode: string
  createdAt: string
}
