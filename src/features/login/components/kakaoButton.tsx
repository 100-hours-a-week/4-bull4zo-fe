import KAKAOICON from '@/assets/kako_icon.svg'
import { Button, Icon } from '@/components/index'
import { trackEvent } from '@/lib/trackEvent'

const KakaoButton = () => {
  const kakaoUrl =
    import.meta.env.VITE_KAKAO_AUTH_URL +
    '?response_type=code&client_id=' +
    import.meta.env.VITE_KAKAO_AUTH_CLIENT_ID +
    '&redirect_uri=' +
    import.meta.env.VITE_BASE_URL +
    '/auth/callback'

  return (
    <a
      onClick={() =>
        trackEvent({
          cta_id: 'login_kakao',
          action: 'click',
          page: location.pathname,
        })
      }
      href={kakaoUrl}
    >
      <Button className="px-8 text-2xl py-7 cursor-pointer bg-[#FFE030] hover:bg-[#FFE030] hover:text-inherit">
        <Icon src={KAKAOICON} size={32} alt="카카오 로고 아이콘" />
        <span>카카오 로그인</span>
      </Button>
    </a>
  )
}
export default KakaoButton
