import { useEffect } from 'react'
import { useModalStore } from '@/stores/index'

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModalStore()

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (isOpen && main) {
      main.style.overflow = 'hidden'
    } else {
      if (main) main.style.overflow = 'auto'
    }
    return () => {
      if (main) main.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 h-full z-[9999] flex items-center justify-center bg-black/50 max-w-[450px] w-full"
      aria-modal="true"
      role="dialog"
      onClick={() => closeModal()}
    >
      <div
        className="rounded-lg relative z-60"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {modalContent}
      </div>
    </div>
  )
}
