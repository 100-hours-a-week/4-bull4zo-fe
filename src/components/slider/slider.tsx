import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { infiniteNotificationQueryOptions } from '@/api/services/notification/queries'
import { NotificationList } from '@/components/index'
import { useNotificationStore, useSliderStore } from '@/stores/index'

export const Slider = () => {
  const { isOpen, close } = useSliderStore()
  const { clearNotification } = useNotificationStore()

  const handleClose = () => {
    clearNotification()
    close()
  }

  // keyboard 이벤트 추가
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed top-0 z-60 h-full w-full max-w-[450px] flex justify-end overflow-hidden">
            <motion.div
              className="fixed top-0 h-full bg-black/50 max-w-[450px] w-full overflow-hidden backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            <motion.div
              className="w-[80%] max-w-[315px] z-10 h-full bg-white shadow-lg py-4 overflow-y-auto flex flex-col hide-scrollbar "
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-lg font-semibold">알림</h2>
                <button className="cursor-pointer" onClick={handleClose} aria-label="닫기">
                  <IoClose size={24} />
                </button>
              </div>
              <NotificationSlider />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const NotificationSlider = () => {
  const queryClient = useQueryClient()
  const {
    data: notifications,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(infiniteNotificationQueryOptions())
  const { newNotification } = useNotificationStore()

  useEffect(() => {
    if (newNotification) {
      queryClient.refetchQueries({ queryKey: ['notifications'] })
    }
  }, [newNotification, queryClient])

  return (
    <div className="flex-1 justify-center flex">
      {!notifications ||
      notifications.pages[notifications.pages.length - 1].notifications.length === 0 ? (
        <p className="px-4 pt-8">
          아직 알림이 없어요.
          <br />
          투표 결과나 댓글 알림이 여기에 표시돼요!
        </p>
      ) : (
        <NotificationList
          data={notifications}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  )
}
