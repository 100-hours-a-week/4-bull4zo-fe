import { useGroupAnalysisQuery } from '@/api/services/group/queries'
import { useTop3VotesQuery } from '@/api/services/vote/queries'
import { PieChart, VoteItem } from '@/components/index'
import { formatDateTimeDetail } from '@/utils/time'

interface Props {
  data: ReturnType<typeof useGroupAnalysisQuery>['data']
}

export const ReportContentChart = ({ data }: Props) => {
  const endDate = new Date(data.weekStartAt)
  endDate.setDate(endDate.getDate() + 7)

  return (
    <div className="px-5">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">{data.groupName}</h1>
        <span className="text-xs">{`${formatDateTimeDetail(data.weekStartAt)} ~ ${formatDateTimeDetail(endDate.toISOString())}`}</span>
      </div>
      <div>
        <h2 className="text-lg font-medium mb-2">참여율</h2>
        <div className="flex items-center justify-center">
          <PieChart
            data={[
              { name: '참여', value: data.participationStats.participated, color: '#3AC98C' },
              { name: '미참여', value: data.participationStats.notParticipated, color: '#FFD1CF' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
export const ReportContentVotes = ({ groupId }: { groupId: number }) => {
  const { data } = useTop3VotesQuery(groupId, 'weekly')

  return (
    <div className="px-5">
      <h2 className="text-lg font-medium mb-2">Top3</h2>
      <ul className="flex flex-col gap-4 pt-4 pb-4 px-4">
        {data.topVotes.map((vote, idx) => (
          <VoteItem key={vote.voteId} rank={idx + 1} {...vote} />
        ))}
      </ul>
    </div>
  )
}
