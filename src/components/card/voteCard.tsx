import { useEffect, useState } from 'react'
import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.png'
import formatTime from '@/lib/formatTime'
import { Icon } from '../Icon/icon'
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
      className={`px-4 py-9 w-[90%] md:w-[70%] h-[30rem] max-h-[75%] pointer-events-auto ${!isImageValid ? 'bg-primary' : ''} text-white rounded-[3.125rem] shadow-card`}
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
          <CardTitle className="font-pyeojinGothic text-xl line-clamp-1">
            {props.authorNickname}
          </CardTitle>
          {props.adminVote === 1 && <Icon src={META_ICON} alt="공인 뱃지" size={20} />}
        </div>
        <span className="text-xs pr-2">{formatTime(props.closedAt as string)}</span>
      </CardHeader>
      <CardContent className="flex-1 relative px-0 overflow-hidden">
        <div className="absolute inset-0 px-2">
          <div className="min-h-full flex items-center justify-center">
            <p
              data-testid="vote-content"
              className="sm:text-xl whitespace-pre-line break-all text-center py-2"
            >
              {props.content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
