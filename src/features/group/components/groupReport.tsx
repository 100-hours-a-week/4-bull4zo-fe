import { Button } from '@/components/ui/button'

export const GroupReport = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">그룹 리포트</h1>
      <Button className="h-full w-full bg-white text-lg py-3 shadow-md">
        그룹 내 리포트 확인하기
      </Button>
      <Button className="mt-4 h-full w-full bg-white text-lg py-3 shadow-md">
        그룹 내 투표 목록 확인하기
      </Button>
    </div>
  )
}
