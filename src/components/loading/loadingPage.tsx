import { SyncLoader } from 'react-spinners'

export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center screen-minus-header-nav gap-8">
      <SyncLoader color="#FFC439" speedMultiplier={0.7} />
      <h1 className="text-center font-medium">
        페이지를 불러오고 있어요... <br /> 잠시만 기다려 주세요 :)
      </h1>
    </div>
  )
}
