import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import KakaoButton from '@/features/login/components/kakaoButton'
import { useUserStore } from '@/stores/userStore'

const LoginPage = () => {
  const router = useNavigate()
  const isLogin = useUserStore((state) => state.isLogin)

  useEffect(() => {
    if (isLogin) {
      router('/')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-[10vh]">
      <div className="flex flex-col items-center justify-center font-unbounded">
        <h1 className="text-[3rem] font-semibold">MOA</h1>
        <p className="text-[2rem]">모두의 Agenda</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <KakaoButton />
        <Label onClick={() => router(`/`)} className="text-2xl underline cursor-pointer">
          로그인 없이 둘러보기
        </Label>
      </div>
    </div>
  )
}
export default LoginPage
