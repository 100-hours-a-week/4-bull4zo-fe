import { useEffect, useState } from 'react'
import { MoveLeft, MoveRight, MoveUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { trackEvent } from '@/lib/trackEvent'
import { useTutorialStore } from '@/stores/tutorialStore'

export const TutorialPage = () => {
  const { hideUntil, setHideUntil } = useTutorialStore()

  const [checked, setChecked] = useState(false)

  const handleClose = () => {
    if (checked) {
      const tomorrow = Date.now() + 24 * 60 * 60 * 1000
      setHideUntil(tomorrow)
    } else {
      const hideTime = Date.now() + 60 * 60 * 1000
      setHideUntil(hideTime)
    }
  }

  useEffect(() => {
    if (!hideUntil) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center text-white bg-black/60"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full h-full max-w-[575px] relative">
        <div className="absolute top-20 left-4 border-2 w-41 h-9" />
        <div className="absolute top-19 left-50 text-center">
          그룹 선택 드롭다운
          <br />
          (로그인 후 보여집니다)
        </div>
        <div className="text-[1.25rem] text-center absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          화면을 스와이프해 <br />
          투표해 보세요!
        </div>
        <MoveUp
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[35%]"
          size={36}
        />
        <div className="text-2xl absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2  top-[43%]">
          기권
        </div>
        <MoveLeft className=" absolute left-[5%] top-[50%]" size={36} />
        <div className="text-2xl absolute left-[15%] top-[50%]">반대</div>
        <MoveRight className="absolute right-[5%] top-[50%]" size={36} />
        <div className="text-2xl absolute right-[15%] top-[50%]">찬성</div>
        <div className="absolute text-[0.875rem] top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center min-w-[20rem]">
          로그인 없이 3개까지 체험할 수 있어요. <br />
          실제 투표에는 반영되지 않아요. <br />
          로그인하면 다시 투표할 수 있어요!
        </div>
        <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer">
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => {
              setChecked(!!value)
              trackEvent({
                cta_id: 'tutorial_checkbox',
                action: 'toggle',
                checked: !!value,
                page: location.pathname,
              })
            }}
            className="mr-2"
          />
          <span onClick={() => setChecked((prev) => !prev)}>하루동안 보지 않기</span>
        </div>
        <Button
          onClick={() => {
            handleClose()
            trackEvent({
              cta_id: 'tutorial_close_button',
              action: 'click',
              page: location.pathname,
            })
          }}
          className="cursor-pointer absolute bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          튜토리얼 닫기
        </Button>
      </div>
    </div>
  )
}
