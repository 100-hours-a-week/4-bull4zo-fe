import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useModalStore } from '@/stores/modalStore'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type InviteCodeCheckModalProps = {
  code: string
}

export const InviteCodeCheckModal = ({ code }: InviteCodeCheckModalProps) => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const [copied, setCopied] = useState(false)

  const onClickHandler = () => {
    navigation(`/user`)
    closeModal()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast('초대코드 복사 완료')
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-xl text-center">
            초대코드는 마이페이지의 <br /> 내 그룹에서 확인 가능합니다!
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div className="bg-white px-4 py-3 rounded-2xl text-lg font-bold flex flex-row  items-center gap-4">
          초대코드: {code}
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-primary transition cursor-pointer"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="w-full flex justify-around">
          <Button className="px-7" onClick={onClickHandler}>
            확인
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
