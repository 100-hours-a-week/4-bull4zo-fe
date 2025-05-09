import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateVoteMutation } from '@/api/services/vote/quries'
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

  console.log(submit.current)

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
      },
    )
  }

  return (
    <div className="flex flex-col w-full justify-center items-center h-full">
      <VoteCardPreview content={content} image={image} closedAt={closedAt} anonymous={anonymous} />
      <div className="flex gap-4 mt-4">
        <Button onClick={() => closeModal()}>닫기</Button>
        <Button onClick={onSubmit}>등록</Button>
      </div>
    </div>
  )
}
