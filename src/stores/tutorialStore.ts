import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TutorialStore = {
  hideUntil: number | null
  // eslint-disable-next-line no-unused-vars
  setHideUntil: (timestamp: number | null) => void
  reset: () => void
}

export const useTutorialStore = create(
  persist<TutorialStore>(
    (set) => ({
      hideUntil: null,
      setHideUntil: (timestamp) => set({ hideUntil: timestamp }),
      reset: () => set({ hideUntil: null }),
    }),
    {
      name: 'tutorial-store',
    },
  ),
)
