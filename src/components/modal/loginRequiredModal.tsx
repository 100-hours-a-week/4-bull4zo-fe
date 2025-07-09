import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index'
import { useModalStore } from '@/stores/index'

export const LoginRequiredCard = () => {
  const navigation = useNavigate()
  const { closeModal } = useModalStore()

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl text-center">
            로그인 후 이용할 수 있는 <br /> 페이지 입니다.
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 justify-center items-center">
        <Button
          className="px-5"
          onClick={() => {
            closeModal()
          }}
        >
          취소
        </Button>
        <Button
          className="px-5"
          onClick={() => {
            closeModal()
            navigation('/login')
          }}
        >
          로그인
        </Button>
      </CardContent>
    </Card>
  )
}
