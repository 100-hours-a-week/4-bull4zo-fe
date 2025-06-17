const ServerUnablePage = () => {
  return (
    <section className="w-full absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <img src="/images/moa_503.svg" className="w-[300px]" alt="로고 이미지" />
      <h1 className="text-xl text-center">
        <span className="text-primary font-bold">서비스</span> 이용 시간이 아닙니다.
        <br />
        <br />
        <span className="text-[1rem]">평일 09:00 ~ 21:00 사이에 이용해 주세요.</span>
      </h1>
    </section>
  )
}

export default ServerUnablePage
