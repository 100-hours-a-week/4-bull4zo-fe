import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/index'

export const NoVoteAvailableModal = () => {
  const navigation = useNavigate()

  return (
    <Card
      className={`flex justify-center px-4 py-9 w-[20rem] h-[20rem] rounded-[0.75rem] shadow-card bg-gray-300
    `}
    >
      <CardHeader className="flex flex-row px-0 justify-center items-center">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="text-2xl text-center">로그인이 필요합니다.</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-5">
        <div className="text-[0.875rem]">
          <p>3개까지 맛보기 투표가 가능해요!</p>
          <p>로그인 후 계속 투표할 수 있어요.</p>
        </div>
        <div className="w-full flex justify-around">
          <Button
            className="px-7"
            onClick={() => {
              window.location.reload()
            }}
          >
            취소
          </Button>
          <Button
            className="px-5"
            onClick={() => {
              navigation('/login')
            }}
          >
            로그인
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
