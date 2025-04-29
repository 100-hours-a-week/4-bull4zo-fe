import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { axiosInstance } from '@/api/axios'
import KAKAOICON from '@/assets/kako_icon.svg'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../../../components/Icon/icon'
import { Button } from '../../../components/ui/button'

const KakaoButton = () => {
  const router = useNavigate()
  const setIsLogin = useUserStore((state) => state.setIsLogin)
  const setAccessToken = useUserStore((state) => state.setAccessToken)

  const handleKakaoLogin = async () => {
    try {
      const kakaoAuthCode = import.meta.env.VITE_KAKAO_AUTH_CODE || ''

      const response = await axiosInstance.post('/api/v1/auth/login', {
        provider: 'kakao',
        code: kakaoAuthCode,
      })

      const { accessToken } = response.data.data

      setIsLogin(true)
      setAccessToken(accessToken)

      router('/')
    } catch (e) {
      const message = e instanceof Error ? e.message : '로그인에 실패했습니다.'
      toast('로그인에 실패했습니다. 다시 시도해주세요!', {
        description: message,
        action: {
          label: '확인',
          onClick: () => {
            toast.dismiss()
          },
        },
      })
    }
  }

  return (
    <Button
      onClick={handleKakaoLogin}
      className="px-8 text-2xl py-7 cursor-pointer bg-[#FFE030] hover:bg-[#FFE030] hover:text-inherit"
    >
      <Icon src={KAKAOICON} size={32} alt="카카오 로고 아이콘" />
      <span>카카오 로그인</span>
    </Button>
  )
}
export default KakaoButton
