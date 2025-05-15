import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TutorialStore = {
  hideUntil: number | null
  // eslint-disable-next-line no-unused-vars
  setHideUntil: (timestamp: number | null) => void
  isExpired: () => boolean
  reset: () => void
}

export const useTutorialStore = create(
  persist<TutorialStore>(
    (set, get) => ({
      hideUntil: null,
      setHideUntil: (timestamp) => set({ hideUntil: timestamp }),
      isExpired: () => {
        const hideUntil = get().hideUntil
        return !hideUntil || Date.now() > hideUntil
      },
      reset: () => set({ hideUntil: null }),
    }),
    {
      name: 'tutorial-store',
    },
  ),
)
