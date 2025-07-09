export const NotFoundPage = () => {
  return (
    <section className="w-full absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <img src="/images/moa_404.svg" className="w-[300px]" alt="로고 이미지" />
      <h1 className="text-xl text-center">
        <span className="text-primary font-bold">페이지</span>를 찾을 수 없습니다.
        <br />
        <br />
        <span className="text-[1rem]">
          이전 페이지로 돌아가거나, <br /> 다른 페이지를 이용해주세요
        </span>
      </h1>
    </section>
  )
}
export default NotFoundPage
