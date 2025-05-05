import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useVoteDetailInfo, useVoteDetailResults } from '@/api/services/vote/quries'
import { Label } from '@/components/ui/label'
import formatTime from '@/lib/formatTime'

const ResearchDetailPage = () => {
  const navigation = useNavigate()

  const { voteId } = useParams()
  const { data: voteDetail, isLoading: detailLoading } = useVoteDetailInfo(voteId as string)
  const { data: voteResult, isLoading: resultLoading } = useVoteDetailResults(voteId as string)

  if (detailLoading || resultLoading) return <div>로딩중...</div>

  return (
    <article>
      <ChevronLeft onClick={() => navigation(-1)} className="mx-7 mt-5" />
      <section className="mx-9 pb-8">
        <div className="mt-4">
          <h1 className="text-xs font-semibold">{voteDetail?.groupId}</h1>
          <p className="mt-2 text-[1.125rem] font-bold">{voteDetail?.content}</p>
          <p className="mt-3">{voteDetail?.authorNickname}</p>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          <p className="font-semibold text-end">{voteResult?.totalCount}표</p>
          <div className="relative h-12 w-full rounded bg-gray-200 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-red-500 text-white pl-2 flex flex-col justify-center"
              style={{ width: `${voteResult?.results[1]?.ratio}%` }}
            >
              <Label className="font-bold">No</Label>
              <Label>
                {voteResult?.results[1]?.ratio}% {voteResult?.results[1]?.count}표
              </Label>
            </div>
          </div>
          <div className="relative h-12 w-full rounded bg-gray-200 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-green-500 text-white pl-2 flex flex-col justify-center"
              style={{ width: `${voteResult?.results[0]?.ratio}%` }}
            >
              <Label className="font-bold">No</Label>
              <Label>
                {voteResult?.results[0]?.ratio}% {voteResult?.results[0]?.count}표
              </Label>
            </div>
          </div>
          <div className="text-xs font-semibold  text-gray">
            {formatTime(voteDetail?.createdAt as string)} ~{' '}
            {formatTime(voteDetail?.closedAt as string)}
          </div>
        </div>
      </section>
      <div className="bg-gray-400 w-full h-[0.0625rem]" />
    </article>
  )
}
export default ResearchDetailPage
