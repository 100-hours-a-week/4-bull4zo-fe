import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { userService } from '@/api/services/user/service'
import { useUserStore } from '@/stores/userStore'

const TokenGate = ({ children }: { children: React.ReactNode }) => {
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { accessToken, setAccessToken, setIsLogin } = useUserStore()

  useEffect(() => {
    const verify = async () => {
      const skipPaths = ['/login', '/auth/callback']
      if (skipPaths.includes(location.pathname)) {
        setChecked(true)
        return
      }

      if (!accessToken) {
        try {
          const token = await userService.refreshAccessToken()
          setAccessToken(token.accessToken)
          setIsLogin(true)
        } catch {
          navigate('/home')
        }
      }

      setChecked(true)
    }

    verify()
  }, [accessToken, navigate, setAccessToken, setIsLogin, location.pathname])

  if (!checked) return null

  return <>{children}</>
}

export default TokenGate
