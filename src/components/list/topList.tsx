import { useTop3VotesQuery } from '@/api/services/vote/queries'
import { Label, VoteItem } from '@/components/index'
import { useGroupStore, useUserStore } from '@/stores/index'
import { formatDateTimeDetail } from '@/utils/time'

export const TopList = () => {
  const { isLogin } = useUserStore()
  const { selectedId } = useGroupStore()
  const { data } = useTop3VotesQuery(selectedId, undefined, isLogin)

  const { from, to } = getKSTDateRange()

  return (
    <section className="px-7 py-4">
      <div className="flex items-center justify-between">
        <Label className="text-2xl font-unbounded">Top3</Label>
        <Label className=" text-xs opacity-50">{`${formatDateTimeDetail(from)} ~ ${formatDateTimeDetail(to)}`}</Label>
      </div>
      {data ? (
        <ul className="flex flex-col gap-4 pt-4">
          {data.topVotes.map((vote, idx) => (
            <VoteItem key={vote.voteId} rank={idx + 1} {...vote} />
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col px-7 cursor-pointer font-medium bg-white py-8 min-h-26 rounded-[30px] gap-4 shadow-lg">
          😴 어제는 조용한 하루였어요 <br />
          오늘은 어떤 투표가 떠오를까요?
        </div>
      )}
    </section>
  )
}

// 현재 컴포넌트에서만 쓰이는 시간 변환 함수
const getKSTDateRange = () => {
  const now = new Date()

  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

  const to =
    now < todayMidnight ? new Date(todayMidnight.getTime() - 24 * 60 * 60 * 1000) : todayMidnight

  const from = new Date(to.getTime() - 24 * 60 * 60 * 1000)

  const format = (d: Date) => {
    const yyyy = d.getFullYear()
    const MM = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}`
  }

  return {
    from: format(from),
    to: format(to),
  }
}
