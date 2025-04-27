import { create } from 'zustand'

interface UserState {
  id: string
  name: string
}

export const useUserStore = create<UserState>((set) => ({
  id: '1',
  name: 'logan',
  setId: (id: string) => set({ id }),
  setName: (name: string) => set({ name }),
}))
