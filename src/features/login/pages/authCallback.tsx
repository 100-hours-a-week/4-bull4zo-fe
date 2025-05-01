import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { axiosInstance } from '@/api/axios'
import { useUserStore } from '@/stores/userStore'

const AuthCallback = () => {
  const navigate = useNavigate()
  const setIsLogin = useUserStore((state) => state.setIsLogin)
  const setAccessToken = useUserStore((state) => state.setAccessToken)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const kakaoAuthCode = params.get('code')

    if (kakaoAuthCode) {
      handleKakaoLogin(kakaoAuthCode)
    } else {
      toast('로그인에 실패했습니다. 인증 코드가 없습니다.')
      navigate('/login') // 실패시 로그인 페이지로 리디렉션
    }
  }, [navigate])

  const handleKakaoLogin = async (kakaoAuthCode: string) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/login/oauth', {
        provider: 'kakao',
        code: kakaoAuthCode,
      })

      const { accessToken } = response.data.data

      setIsLogin(true)
      setAccessToken(accessToken)

      navigate('/')
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

  return <div>로딩 중...</div>
}

export default AuthCallback
