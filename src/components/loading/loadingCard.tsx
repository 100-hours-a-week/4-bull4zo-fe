import { SyncLoader } from 'react-spinners'
import { Card, CardContent } from '@/components/index'

export const LoadingCard = () => {
  return (
    <Card
      className={`px-4 py-9 w-[80%] h-[30rem] max-h-[75%] bg-primary-gradient-down text-white rounded-[3.125rem] shadow-card`}
    >
      <CardContent className="flex flex-col justify-center items-center h-full overflow-y-auto text-2xl text-center font-semibold gap-10">
        <div>
          투표를 불러오고 있어요. <br /> 잠시만 기다려주세요 :)
        </div>
        <SyncLoader color="#FFF085" speedMultiplier={0.7} />
      </CardContent>
    </Card>
  )
}
