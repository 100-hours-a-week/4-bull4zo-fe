import { FaAngleLeft } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import MOA_HOME_ICON from '@/assets/moa_home.svg?react'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../Icon/icon'
import { Button } from '../ui/button'

const Header = () => {
  const router = useNavigate()
  const isLogin = useUserStore((state) => state.isLogin)

  const location = useLocation()

  const path = location.pathname
  const excludedPaths = ['/home', '/make', '/research', '/user']
  const showBackbutton = !excludedPaths.includes(path)

  const handleBack = () => {
    if (path.startsWith('/user') && path.split('/').length > 2) {
      const firstCut = path.slice(0, path.lastIndexOf('/'))
      const secondCut = firstCut.slice(0, firstCut.lastIndexOf('/')) || '/'
      router(secondCut)
      return
    }

    const lastPath = path.lastIndexOf('/')
    const newPath = path.slice(0, lastPath) || '/'
    router(newPath)
  }

  return (
    <header className=" fixed w-full max-w-[450px] overflow-hidden shadow-header flex flex-row justify-between items-center z-[999] bg-white">
      {showBackbutton && (
        <button className="ml-2 cursor-pointer" onClick={handleBack} aria-label="뒤로가기">
          <FaAngleLeft size={24} />
        </button>
      )}
      <a href="/home" className="inline-block w-24 h-16 cursor-pointer">
        <Icon component={MOA_HOME_ICON} className="h-full w-full" />
      </a>
      <div className="mr-4">
        {isLogin ? (
          <Bell className="cursor-pointer" size={24} />
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
