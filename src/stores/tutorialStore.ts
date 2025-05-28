import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TutorialStore = {
  isHidden: boolean
  close: () => void
  open: () => void
  reset: () => void
}

export const useTutorialStore = create(
  persist<TutorialStore>(
    (set) => ({
      isHidden: false,
      close: () => set({ isHidden: true }),
      open: () => set({ isHidden: false }),
      reset: () => set({ isHidden: false }),
    }),
    {
      name: 'tutorial-store',
    },
  ),
)
