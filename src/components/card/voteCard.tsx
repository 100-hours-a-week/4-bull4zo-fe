import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.png'
import { Icon } from '../Icon/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export const VoteCard = (props: Vote) => {
  return (
    <Card
      className={`px-4 py-9 w-[20rem] h-[30rem] ${props.imageUrl === '' ? 'bg-primary' : ''} text-white rounded-[3.125rem] shadow-card`}
      style={
        props.imageUrl
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
        <span className="text-xs pr-2">4시간 후 종료</span>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full overflow-y-auto">
        <p className="text-2xl">{props.content}</p>
      </CardContent>
    </Card>
  )
}
