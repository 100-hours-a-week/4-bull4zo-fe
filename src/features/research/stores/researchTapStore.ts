import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TabStore = {
  index: number
  // eslint-disable-next-line no-unused-vars
  setIndex: (index: number) => void
}

export const useResearchTabStore = create<TabStore>()(
  persist(
    (set) => ({
      index: 0,
      setIndex: (index) => set({ index }),
    }),
    {
      name: 'research-tab-index',
    },
  ),
)
