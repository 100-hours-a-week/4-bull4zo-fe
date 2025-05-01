import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.png'
import formatTime from '@/lib/formatTime'
import { Icon } from '../Icon/icon'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const VoteCard = (props: Partial<Vote>) => {
  const [isImageValid, setIsImageValid] = useState(false)

  useEffect(() => {
    if (!props.imageUrl) return setIsImageValid(false)

    const img = new Image()
    img.src = props.imageUrl
    img.onload = () => setIsImageValid(true)
    img.onerror = () => setIsImageValid(false)
  }, [props.imageUrl])

  return (
    <Card
      className={`px-4 py-9 w-[20rem] h-[30rem] ${!isImageValid ? 'bg-primary' : ''} text-white rounded-[3.125rem] shadow-card`}
      style={
        isImageValid
          ? {
              backgroundImage: `url(${props.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <CardHeader className="flex flex-row justify-between px-0">
        <div className="flex flex-row gap-1">
          <CardTitle className="font-unbounded text-2xl">{props.authorNickname}</CardTitle>
          {props.adminVote === 0 && <Icon src={META_ICON} alt="공인 뱃지" size={20} />}
        </div>
        <span className="text-xs pr-2">{formatTime(props.closedAt as string)}</span>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full overflow-y-auto">
        <p className="text-2xl">{props.content}</p>
      </CardContent>
    </Card>
  )
}

export const VoteEndCard = () => {
  const navigation = useNavigate()

  return (
    <Card
      className={`px-4 py-9 w-[20rem] h-[30rem] flex justify-center bg-primary text-white rounded-[3.125rem] shadow-card relative`}
    >
      <CardHeader className="flex flex-col justify-between w-full items-center px-0 text-black">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl">모든 투표가 끝났습니다!</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-around items-center text-black">
        <div className="w-full flex justify-around">
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
export const VoteNoMoreCard = () => {
  const navigation = useNavigate()

  return (
    <Card
      className={`px-4 py-9 w-[20rem] h-[30rem] flex justify-center bg-primary text-white rounded-[3.125rem] shadow-card relative`}
    >
      <CardHeader className="flex flex-col justify-between w-full items-center px-0 text-black">
        <div className="flex flex-row gap-1 ">
          <CardTitle className="font-unbounded text-2xl">
            지금은 잠잠하네요... <br /> 새로운 투표가 없습니다.
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-around items-center text-black">
        <div className="w-full flex justify-around">
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
