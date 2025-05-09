import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/quries'
import { Label } from '@/components/ui/label'
import { formatTimeDetail } from '@/lib/formatTime'
import { toKstISOString } from '@/lib/toKSTISOString'
import { useGroupStore } from '@/stores/groupStore'

const ResearchDetailPage = () => {
  const navigation = useNavigate()

  const { groups } = useGroupStore()

  const { voteId } = useParams()
  const { data: voteDetail, isLoading: detailLoading } = useVoteDetailInfo(voteId as string)
  const { data: voteResult, isLoading: resultLoading } = useVoteDetailResults(voteId as string)

  if (detailLoading || resultLoading) return <div>로딩중...</div>

  const agree = voteResult?.results[0]
  const disAgree = voteResult?.results[1]

  // 생성 시간 한국으로 변경
  const date = new Date(voteDetail?.createdAt as string)
  date.setHours(date.getHours() + 9)

  return (
    <article>
      <ChevronLeft onClick={() => navigation(-1)} className="mx-7 mt-5 cursor-pointer" />
      <section className="mx-9 pb-8">
        <div className="mt-4">
          <h1 className="text-xs font-semibold">
            {groups.find((f) => f.groupId === voteDetail?.groupId)?.name}
          </h1>
          <p className="mt-2 text-[1.125rem] font-bold">{voteDetail?.content}</p>
          <p className="mt-3">{voteDetail?.authorNickname}</p>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          <p className="font-semibold text-end">{voteResult?.totalCount}표</p>
          <div className="relative h-12 w-full rounded bg-gray-200 overflow-hidden">
            {(disAgree?.count as number) > 0 && (
              <div
                className="absolute left-0 top-0 h-full bg-red-500 text-white pl-2 flex flex-col justify-center"
                style={{ width: `${Math.round(disAgree?.ratio as number)}%` }}
              >
                <Label className="font-bold">No</Label>
                <Label>
                  {Math.round(disAgree?.ratio as number)}% {disAgree?.count}표
                </Label>
              </div>
            )}
          </div>
          {(agree?.count as number) > 0 && (
            <div className="relative h-12 w-full rounded bg-gray-200 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 text-white pl-2 flex flex-col justify-center"
                style={{ width: `${Math.round(agree?.ratio as number)}%` }}
              >
                <Label className="font-bold">Yes</Label>
                <Label>
                  {Math.round(agree?.ratio as number)}% {agree?.count}표
                </Label>
              </div>
            </div>
          )}
          <div className="text-xs font-semibold  text-gray">
            {formatTimeDetail(toKstISOString(voteDetail?.createdAt as string))} ~{' '}
            {formatTimeDetail(voteDetail?.closedAt as string)}
          </div>
        </div>
      </section>
      <div className="bg-gray-400 w-full h-[0.0625rem]" />
    </article>
  )
}
export default ResearchDetailPage
