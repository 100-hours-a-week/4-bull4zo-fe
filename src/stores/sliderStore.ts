import { create } from 'zustand'

interface SliderStore {
  isOpen: boolean
  open: () => void
  close: () => void
  reset: () => void
}

export const useSliderStore = create<SliderStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  reset: () => set({ isOpen: false }),
}))
