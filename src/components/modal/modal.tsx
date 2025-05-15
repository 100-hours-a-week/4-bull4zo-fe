import { useEffect } from 'react'
import { useModalStore } from '@/stores/modalStore'

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
      className="absolute [@media(max-height:820)]:fixed max-[450px]:fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
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
