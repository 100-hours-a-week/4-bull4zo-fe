import { create } from 'zustand'
import { GroupName } from '@/api/services/user/group/model'

interface GroupStore {
  selectedId: number
  groups: GroupName[]
  // eslint-disable-next-line no-unused-vars
  setId: (selectedId: number) => void
  // eslint-disable-next-line no-unused-vars
  setGroups: (groups: GroupName[]) => void
  reset: () => void
}

export const useGroupStore = create<GroupStore>((set) => ({
  selectedId: 1,
  groups: [],
  setId: (selectedId) => set({ selectedId }),
  setGroups: (groups) => set({ groups }),
  reset: () => set({ selectedId: 1, groups: [] }),
}))
