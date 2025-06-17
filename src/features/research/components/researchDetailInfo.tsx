import { VoteDetail, voteDetailResult } from '@/api/services/vote/model'
import CheckIcon from '@/assets/voteCheckIcon.svg'
import { Icon } from '@/components/Icon/icon'
import { Label } from '@/components/ui/label'
import { formatDateTimeDetail } from '@/utils/time'

interface Props {
  voteDetail: VoteDetail
  voteResult: voteDetailResult
}

const ResearchDetailInfo = ({ voteDetail, voteResult }: Partial<Props>) => {
  const agree = voteResult?.results[0]
  const disAgree = voteResult?.results[1]

  return (
    <div>
      <section className="mx-9 pb-8">
        <div className="mt-4">
          <h1 className="text-xs font-semibold">{voteDetail?.groupName}</h1>
          <p className="mt-2 text-[1.125rem] font-medium whitespace-pre-line break-all">
            {voteDetail?.content}
          </p>
          {voteDetail?.imageUrl && (
            <img
              src={voteDetail?.imageUrl}
              className="my-4 w-full max-h-[400px] object-contain rounded-lg mx-auto"
              alt="투표 내 이미지"
            />
          )}
          <p className="mt-3 text-sm">{voteDetail?.authorNickname}</p>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          <p className="font-semibold text-end">{voteResult?.totalCount}표</p>
          {Number(disAgree?.count) > 0 && (
            <div className="relative h-12 w-full rounded bg-gray-200 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-red-500 text-white pl-2 flex flex-col justify-center"
                style={{ width: `${Math.round(disAgree?.ratio as number)}%` }}
              >
                <Label className="font-bold">No</Label>
                <Label>
                  {Math.round(disAgree?.ratio as number)}% {disAgree?.count}표
                </Label>
              </div>
              {voteResult?.userResponse === 2 && (
                <Icon
                  src={CheckIcon}
                  className="w-[27px] h-8 absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
          )}
          {Number(agree?.count) > 0 && (
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
              {voteResult?.userResponse === 1 && (
                <Icon
                  src={CheckIcon}
                  className="w-[27px] h-8 absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
          )}
          <div className="text-xs font-semibold  text-gray">
            {formatDateTimeDetail(voteDetail?.createdAt as string)} ~{' '}
            {formatDateTimeDetail(voteDetail?.closedAt as string)}
          </div>
        </div>
      </section>
      <div className="bg-gray-400 w-full h-[0.0625rem]" />
    </div>
  )
}
export default ResearchDetailInfo
