import { create } from 'zustand'

interface GroupStore {
  selectedId: number
  groups: Group[]
  // eslint-disable-next-line no-unused-vars
  setId: (selectedId: number) => void
  // eslint-disable-next-line no-unused-vars
  setGroups: (groups: Group[]) => void
  reset: () => void
}
interface Group {
  groupId: number
  name: string
}

export const useGroupStore = create<GroupStore>((set) => ({
  selectedId: 1,
  groups: [],
  setId: (selectedId) => set({ selectedId }),
  setGroups: (groups) => set({ groups }),
  reset: () => set({ selectedId: 1, groups: [] }),
}))
