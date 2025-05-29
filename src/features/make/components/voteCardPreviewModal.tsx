import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateVoteMutation } from '@/api/services/vote/queries'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/modalStore'
import { VoteCardPreview } from '../../../components/card/voteCardPreview'
import { Button } from '../../../components/ui/button'

type Props = {
  groupId: number
  content: string
  image?: File
  closedAt: string
  anonymous: boolean
}

export const VoteCardPreviewModal = ({ groupId, content, image, closedAt, anonymous }: Props) => {
  const navigation = useNavigate()

  const { closeModal } = useModalStore()
  const { mutate } = useCreateVoteMutation()

  const submit = useRef<boolean>(false)

  const onSubmit = () => {
    if (submit.current) return
    submit.current = true

    mutate(
      { groupId, content, imageUrl: '', closedAt, anonymous },
      {
        onSuccess: () => {
          toast('투표를 등록했습니다.')
          navigation('/research')
          closeModal()
        },
        onSettled: () => {
          trackEvent({
            cta_id: 'vote_submit',
            action: 'submit',
            page: location.pathname,
          })
        },
      },
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-[100svw] max-w-[450px] gap-4">
      <VoteCardPreview content={content} image={image} closedAt={closedAt} anonymous={anonymous} />
      <div className="text-xl text-white z-10 backdrop-blur-sm">
        투표는 등록 후 <span className="font-bold text-[1.375rem] text-red-300">수정, 삭제</span>가
        불가능합니다.
      </div>
      <div className="flex items-center justify-center w-full gap-4 ">
        <Button className="flex-1 max-w-25" onClick={() => closeModal()}>
          닫기
        </Button>
        <Button className="flex-1 max-w-25" onClick={onSubmit}>
          등록
        </Button>
      </div>
    </div>
  )
}
