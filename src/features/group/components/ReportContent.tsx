import { useGroupAnalysisQuery } from '@/api/services/group/queries'
import { useTop3VotesQuery } from '@/api/services/vote/queries'
import { PieChart } from '@/components/chart/pieChart'
import { VoteItem } from '@/components/item/voteItem'

interface Props {
  data: ReturnType<typeof useGroupAnalysisQuery>['data']
}

export const ReportContentChart = ({ data }: Props) => {
  return (
    <div className="px-5">
      <h1 className="text-xl font-bold mb-4">{data.groupName}</h1>
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
export const ReportContentAnalysis = ({ data }: Props) => {
  return (
    <div className="px-5">
      <h2 className="text-lg font-medium mb-2">요약</h2>
      <p className="px-12">{data.analysis.summaryText}</p>
    </div>
  )
}
