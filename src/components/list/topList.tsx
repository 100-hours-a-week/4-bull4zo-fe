import { Top3VoteResponse } from '@/api/services/vote/model'
import { Label } from '@/components/index'
import { formatDateTimeDetail } from '@/utils/time'
import { RankItem } from '../item/rankItem'

interface Props {
  data: Top3VoteResponse
}

export const TopList = ({ data }: Props) => {
  const { from, to } = getKSTDateRange()

  if (!data) return

  return (
    <section className="px-7 py-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg sm:text-xl font-semibold">🔥 지금 뜨는 인기 투표</Label>
        <Label className="text-xs sm:text-xs opacity-50">{`${formatDateTimeDetail(from)} ~ ${formatDateTimeDetail(to)}`}</Label>
      </div>
      {data.topVotes.length > 0 ? (
        <ul className="flex flex-col gap-4 pt-4">
          {data.topVotes.map((vote, idx) => (
            <RankItem key={vote.voteId} rank={idx + 1} {...vote} />
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col px-7 cursor-pointer font-medium bg-white py-8 min-h-26 rounded-[30px] gap-4 shadow-lg">
          🕊️ 오늘은 조용한 하루예요.
          <br />
          지금 투표를 만들어 오늘의 주인공이 되어보세요!
        </div>
      )}
    </section>
  )
}

// 현재 컴포넌트에서만 쓰이는 시간 변환 함수
const getKSTDateRange = () => {
  // const now = new Date('2025-07-18T08:59:00')
  // const now = new Date('2025-07-17T23:59:00Z')

  const now = new Date()

  const nowUTC = new Date(now.getTime() + 9 * 60 * 60 * 1000)

  const yyyy = nowUTC.getUTCFullYear()
  const MM = nowUTC.getUTCMonth()
  const dd = nowUTC.getUTCDate()

  const todayNineAMKST = Date.UTC(yyyy, MM, dd, 0, 0, 0)
  const todayNineAM = new Date(todayNineAMKST)

  let from, to

  if (nowUTC.getUTCHours() < 9) {
    to = todayNineAM
    from = new Date(todayNineAM.getTime() - 24 * 60 * 60 * 1000)
  } else {
    from = todayNineAM
    to = new Date(todayNineAM.getTime() + 24 * 60 * 60 * 1000)
  }

  const formatUTC = (d: Date) => d.toISOString().slice(0, 16).replace('T', ' ')

  return {
    from: formatUTC(from),
    to: formatUTC(to),
  }
}
