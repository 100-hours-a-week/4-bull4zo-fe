import { useNavigate } from 'react-router-dom'
import { useModalStore } from '@/stores/modalStore'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const InviteCodeCheckModal = () => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  const onClickHandler = () => {
    navigation(`/user`)
    closeModal()
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
        <div className="w-full flex justify-around">
          <Button className="px-7" onClick={onClickHandler}>
            확인
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
