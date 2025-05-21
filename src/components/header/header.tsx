import { useNavigate } from 'react-router-dom'
// import { Bell }  from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { Button } from '../ui/button'

const Header = () => {
  const router = useNavigate()
  const isLogin = useUserStore((state) => state.isLogin)

  return (
    <header className=" fixed w-full max-w-[450px] overflow-hidden shadow-header flex flex-row justify-between items-center z-[999] bg-white">
      <h1 onClick={() => router(`/`)} className="font-unbounded text-2xl mx-3 my-4 cursor-pointer">
        MOA
      </h1>
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
