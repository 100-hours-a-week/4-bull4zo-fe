import MOA_404 from '@/assets/moa_404.svg?react'
import { Icon } from '@/components/Icon/icon'

const NotFoundPage = () => {
  return (
    <section className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <Icon component={MOA_404} className="h-[300px] w-[300px]" />
      <h1 className="text-xl text-center">
        현재 서비스 <span className="text-primary font-bold">준비중</span> 입니다. <br />
        다음에 다시 이용해 주세요!
      </h1>
    </section>
  )
}

export default NotFoundPage
