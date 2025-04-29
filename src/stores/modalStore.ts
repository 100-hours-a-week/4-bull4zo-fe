import React from 'react'
import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  modalContent: React.ReactNode | null
  // eslint-disable-next-line no-unused-vars
  openModal: (content: React.ReactNode) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}))
