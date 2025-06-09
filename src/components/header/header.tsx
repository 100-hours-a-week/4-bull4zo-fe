import { FaAngleLeft } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useInfiniteNotificationQuery } from '@/api/services/notification/queries'
import MOA_HOME_ICON from '@/assets/moa_home.webp'
import { useSliderStore } from '@/stores/sliderStore'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../Icon/icon'
import { Button } from '../ui/button'

const Header = () => {
  const router = useNavigate()
  const isLogin = useUserStore((state) => state.isLogin)
  const { open } = useSliderStore()

  const { data: notifications } = useInfiniteNotificationQuery(undefined, isLogin)

  const hasUnread = notifications?.pages.slice(0, 1).some((page) => {
    return page.notifications.some((notification) => notification.read === 0)
  })

  const location = useLocation()

  const path = location.pathname
  const excludedPaths = ['/home', '/make', '/research', '/user']
  const showBackbutton = !excludedPaths.includes(path)

  const handleBack = () => {
    router(-1)
  }

  return (
    <header className=" fixed w-full max-w-[450px] overflow-hidden shadow-header flex flex-row justify-between items-center z-50 bg-white">
      {showBackbutton && (
        <button className="ml-2 cursor-pointer" onClick={handleBack} aria-label="뒤로가기">
          <FaAngleLeft size={24} />
        </button>
      )}
      <a href="/home" className="inline-block w-24 h-16 cursor-pointer">
        <Icon src={MOA_HOME_ICON} className="h-full w-full" />
      </a>
      <div className="mr-4">
        {isLogin ? (
          <div className="relative cursor-pointer" aria-label="알림">
            <Bell className="cursor-pointer" size={24} onClick={open} />
            {hasUnread && (
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
export default Header
