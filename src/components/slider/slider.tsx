import { IoClose } from 'react-icons/io5'
import { AnimatePresence, motion } from 'framer-motion'
import { useInfiniteNotificationQuery } from '@/api/services/notification/queries'
import { useSliderStore } from '@/stores/sliderStore'
import { NotificationList } from '../list/notificationList'

export const Slider = () => {
  const { isOpen, close } = useSliderStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 h-full z-60 flex items-center justify-center bg-black/50 max-w-[450px] w-full overflow-hidden backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <div className="fixed top-0 z-60 h-full w-full max-w-[450px] flex justify-end overflow-hidden">
            <motion.div
              className="w-[80%] max-w-[315px] h-full bg-white shadow-lg py-4 overflow-y-auto flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-lg font-semibold">알림</h2>
                <button className="cursor-pointer" onClick={close} aria-label="닫기">
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
  const {
    data: notifications,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteNotificationQuery()

  return (
    <div className="flex-1 items-center justify-center flex">
      {!notifications ? (
        <p className="font-medium text-lg px-4">
          아직 알림이 없어요.
          <br />
          투표 결과나 댓글 알림이 여기에 표시돼요!
        </p>
      ) : (
        <NotificationList
          data={notifications}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </div>
  )
}
