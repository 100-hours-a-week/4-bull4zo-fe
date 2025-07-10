import { FaAngleLeft } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useInfiniteNotificationQuery } from '@/api/services/notification/queries'
import MOA_HOME_ICON from '@/assets/moa_home.webp'
import { Button, Icon } from '@/components/index'
import { useNotificationStore, useSliderStore, useUserStore } from '@/stores/index'

export const Header = () => {
  const router = useNavigate()
  const { isLogin } = useUserStore()
  const { open } = useSliderStore()
  const { newNotification } = useNotificationStore()
  const { isOpen } = useSliderStore()
  const { data } = useInfiniteNotificationQuery(isLogin)

  const location = useLocation()

  const path = location.pathname
  const excludedPaths = ['/home', '/make', '/research', '/user', '/auth/callback']
  const showBackButton = !excludedPaths.includes(path)

  const hasUnread = data?.pages
    ?.flatMap((page) => page.notifications)
    ?.some((notification) => notification.read === 0)

  const handleBack = () => {
    router(-1)
  }

  return (
    <header className=" fixed w-full max-w-[450px] overflow-hidden shadow-header flex flex-row justify-between items-center z-50 bg-white">
      {showBackButton && (
        <button className="ml-2 cursor-pointer" onClick={handleBack} aria-label="뒤로가기">
          <FaAngleLeft size={24} />
        </button>
      )}
      <button onClick={() => router('/home')} className="inline-block w-24 h-16 cursor-pointer">
        <Icon
          src={MOA_HOME_ICON}
          className="h-full w-full"
          width={96}
          height={64}
          alt="홈 아이콘"
        />
      </button>
      <div className="mr-4">
        {isLogin ? (
          <div className="relative cursor-pointer">
            <Bell
              className="cursor-pointer"
              size={24}
              onClick={() => {
                open()
              }}
            />
            {!isOpen && (newNotification || hasUnread) && (
              <span className="absolute -top-1 right-0 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span
                  className="relative inline-flex size-3 rounded-full bg-red-500"
                  onClick={open}
                />
              </span>
            )}
          </div>
        ) : (
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => router(`/login`)}
            aria-label="로그인"
          >
            로그인
          </Button>
        )}
      </div>
    </header>
  )
}
