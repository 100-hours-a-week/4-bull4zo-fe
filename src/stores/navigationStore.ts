import { create } from 'zustand'

export type Tab = 'home' | 'make' | 'research' | 'my'

interface NavigationStore {
  tab: Tab
  // eslint-disable-next-line no-unused-vars
  setTab: (tab: Tab) => void
  reset: () => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  tab: 'home',
  setTab: (tab) => set({ tab }),
  reset: () => set({ tab: 'home' }),
}))
