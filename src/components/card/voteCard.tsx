import { useEffect, useState } from 'react'
import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.webp'
import { cn } from '@/lib/utils'
import { useGroupStore } from '@/stores/groupStore'
import { formatRelativeTime } from '@/utils/time'
import { Icon } from '../Icon/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const VoteCard = (props: Partial<Vote>) => {
  const [isImageValid, setIsImageValid] = useState(false)
  const { selectedId: groupId } = useGroupStore()

  useEffect(() => {
    if (!props.imageUrl) return setIsImageValid(false)

    const img = new Image()
    img.src = props.imageUrl
    img.onload = () => setIsImageValid(true)
    img.onerror = () => setIsImageValid(false)
  }, [props.imageUrl])

  return (
    <Card
      className={cn(
        `p-0 w-[80%] h-[30rem] max-h-[75%] border-none  pointer-events-auto text-white rounded-[3.125rem] shadow-card text-shadow-lg`,
        !isImageValid && 'bg-primary-gradient-down',
      )}
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
      <CardHeader className="flex flex-row justify-between px-4 pt-9">
        <div className="flex flex-row gap-1">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <CardTitle className="font-pyeojinGothic text-xl line-clamp-1">
                {props.authorNickname}
              </CardTitle>
              {props.adminVote === 1 && (
                <Icon className="items-start" src={META_ICON} alt="공인 뱃지" size={20} />
              )}
              {props.voteType === 'AI' && (
                <div className="rounded-full bg-primary size-5 flex items-center justify-center border-white border-[1px] text-sm shadow-md">
                  AI
                </div>
              )}
            </div>
            {groupId === 0 && <span className="text-sm line-clamp-1">{props.groupName}</span>}
          </div>
        </div>
        <span className="text-xs pr-2">{formatRelativeTime(props.closedAt as string)}</span>
      </CardHeader>
      <CardContent className="flex-1 relative overflow-hidden px-4 pb-9">
        {isImageValid && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/40 to-transparent rounded-[3.125rem]" />
        )}
        <div
          className={cn(
            'min-h-[90%] flex items-end justify-center px-2',
            !isImageValid && 'items-center',
          )}
        >
          <p
            data-testid="vote-content"
            className="sm:text-xl whitespace-pre-line break-all text-center py-2 z-30"
          >
            {props.content}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
