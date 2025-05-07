import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const VoteEndCard = () => {
  const navigation = useNavigate()

  return (
    <Card
      className={`px-4 py-9 w-[90%] md:w-[70%] h-[30rem] max-h-[75%] flex justify-center bg-primary text-white rounded-[3.125rem] shadow-card relative`}
    >
      <CardHeader className="flex flex-col justify-between w-full items-center px-0 text-black">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl">모든 투표가 끝났습니다!</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-around items-center text-black">
        <div className="w-full flex justify-center gap-4">
          <Button
            className="px-7"
            onClick={() => {
              navigation('/research')
            }}
          >
            결과 보기
          </Button>
          <Button
            className="px-5"
            onClick={() => {
              navigation('/make')
            }}
          >
            새 투표 만들기
          </Button>
        </div>
        <div className=" absolute bottom-8 text-[0.75rem] text-center">
          <p>💬 그룹을 '전체'로 바꾸면 더 많은 투표를 볼 수 있어요!</p>
        </div>
      </CardContent>
    </Card>
  )
}
