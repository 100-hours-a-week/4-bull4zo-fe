export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center screen-minus-header-nav gap-8">
      <div className="w-32 h-32 border-16 border-gray-300 border-t-primary rounded-full animate-spin" />
      <h1 className="text-center text-2xl">
        페이지를 불러오고 있어요... <br /> 잠시만 기다려 주세요 :)
      </h1>
    </div>
  )
}
