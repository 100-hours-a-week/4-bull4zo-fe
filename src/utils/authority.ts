import { GroupRole } from '@/api/services/group/model'

export const ableManage = (role: GroupRole | undefined) => {
  return role === 'MANAGER' || role === 'OWNER'
}
export const ableOwner = (role: GroupRole | undefined) => {
  return role === 'OWNER'
}
