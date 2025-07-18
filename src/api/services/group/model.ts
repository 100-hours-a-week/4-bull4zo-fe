import { PageNation } from '@/types'
import { ParticipatedVote } from '../vote/model'

export interface GroupName {
  groupId: number
  name: string
}
export interface Group {
  groupId: number
  name: string
  description: string
  imageUrl: string
  imageName: string
  inviteCode: string
  role: GroupRole
}

export type GroupRole = 'OWNER' | 'MANAGER' | 'MEMBER'

export type MyGroupNamesData = PageNation<'groups', GroupName[]>

export type MyGroupList = PageNation<'groups', Group[]>

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
  imageName: string
}

export interface CreateGroupData {
  groupId: number
  name: string
  description: string
  imageUrl: string
  imageName: string
  inviteCode: string
  createdAt: string
}

export interface UpdateGroupRequest {
  name?: string
  description?: string
  imageUrl?: string
  imageName?: string
  changeInviteCode?: boolean
}

export interface GroupMember {
  userId: number
  nickname: string
  role: GroupRole
}

export interface GroupMembersResponse {
  groupId: number
  members: GroupMember[]
}

export interface GroupRoleChangeRequest {
  role: GroupRole
}

export interface GroupRoleChangeResponse {
  userId: number
  role: GroupRole
}

export interface GroupMemberDeleteResponse {
  userId: number
}

export type GroupVoteListResponse = PageNation<'votes', ParticipatedVote[]> & {
  groupId: number
  groupName: string
}

export type GroupAnalysisResponse = {
  groupId: number
  groupName: string
  weekStartAt: string
  analysis: {
    overview: {
      voteSummary: string
      commentSummary: string
    }
    sentiment: {
      emotion: string[]
      topKeywords: string[]
    }
    modelReview: string[]
  }
  participationStats: {
    participated: number
    notParticipated: number
  }
}
