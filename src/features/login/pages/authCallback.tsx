import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { axiosInstance } from '@/api/axios'
import { LoadingPage } from '@/components/loading/loadingPage'
import { useUserStore } from '@/stores/userStore'
import { logoutAndResetStores } from '@/utils/reset'

const AuthCallback = () => {
  const navigate = useNavigate()
  const setIsLogin = useUserStore((state) => state.setIsLogin)
  const setAccessToken = useUserStore((state) => state.setAccessToken)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const kakaoAuthCode = params.get('code')

    if (kakaoAuthCode) {
      handleKakaoLogin(kakaoAuthCode)
      navigate('/home')
    } else {
      toast('로그인에 실패했습니다. 인증 코드가 없습니다.')
      navigate('/login') // 실패시 로그인 페이지로 리디렉션
    }
  }, [navigate])

  const isDoing = useRef(false)

  const handleKakaoLogin = async (kakaoAuthCode: string) => {
    if (isDoing.current) return
    isDoing.current = true

    try {
      const response = await axiosInstance.post(
        '/api/v1/auth/login/oauth',
        {
          provider: 'kakao',
          code: kakaoAuthCode,
        },
        {
          headers: {
            'X-Redirect-Uri': import.meta.env.VITE_BASE_URL + '/auth/callback',
          },
        },
      )

      const { accessToken } = response.data.data

      logoutAndResetStores()
      setIsLogin(true)
      setAccessToken(accessToken)
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      isDoing.current = false
      setIsLogin(false)
      toast('로그인에 실패했습니다. 다시 시도해주세요!', {
        action: {
          label: '확인',
          onClick: () => {
            toast.dismiss()
          },
        },
      })
    }
  }

  return <LoadingPage />
}

export default AuthCallback
