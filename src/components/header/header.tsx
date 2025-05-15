import { useNavigate } from 'react-router-dom'
import MOA_HOME_ICON from '@/assets/moa_home.svg?react'
// import { Bell }  from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../Icon/icon'
import { Button } from '../ui/button'

const Header = () => {
  const router = useNavigate()
  const isLogin = useUserStore((state) => state.isLogin)

  return (
    <header className=" fixed w-full max-w-[450px] overflow-hidden shadow-header flex flex-row justify-between items-center z-[999] bg-white">
      <a href="/home" className="inline-block w-24 h-16 cursor-pointer">
        <Icon component={MOA_HOME_ICON} className="h-full w-full" />
      </a>
      <div className="mr-4">
        {isLogin ? (
          // <Bell className="cursor-pointer" size={24} />
          <></>
        ) : (
          <Button className="cursor-pointer" onClick={() => router(`/login`)}>
            로그인
          </Button>
        )}
      </div>
    </header>
  )
}
export default Header
