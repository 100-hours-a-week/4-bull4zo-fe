import { useEffect } from 'react'
import { useModalStore } from '@/stores/modalStore'

export const Modal = () => {
  const { isOpen, modalContent } = useModalStore()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/50"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="p-6 w-full max-w-[575px] flex items-center justify-center rounded-lg relative z-60"
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>
  )
}
