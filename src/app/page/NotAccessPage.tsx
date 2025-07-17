import { useNavigate } from 'react-router-dom'
import { Button } from '@/components'

export const NotAccessPage = () => {
  const route = useNavigate()

  return (
    <section className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <h1 className="text-xl text-center">
        <span className="text-primary font-bold text-2xl">상세 페이지는</span> <br /> 투표에 참여한
        사람만 조회 가능합니다.
        <br />
        <br />
        <Button className="bg-primary" onClick={() => route('/home')}>
          투표하러 가기
        </Button>
      </h1>
    </section>
  )
}
