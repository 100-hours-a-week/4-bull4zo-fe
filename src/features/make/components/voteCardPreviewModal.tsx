import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authAxiosInstance } from '@/api/axios'
import { createdVotesKey } from '@/api/services/vote/key'
import { useCreateVoteMutation, useUpdateVoteMutation } from '@/api/services/vote/queries'
import { Button, VoteCardPreview } from '@/components/index'
import { useResearchTabStore } from '@/features/research/stores/researchTapStore'
import { trackEvent } from '@/lib/trackEvent'
import { useModalStore } from '@/stores/index'

type Props = {
  groupId: number
  content: string
  image?: File | string
  closedAt: string
  anonymous: boolean
}

export const VoteCardPreviewModal = ({ groupId, content, image, closedAt, anonymous }: Props) => {
  const { voteId } = useParams()
  const navigation = useNavigate()
  const { closeModal } = useModalStore()
  const { setIndex } = useResearchTabStore()

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    ...useCreateVoteMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: createdVotesKey() })
    },
  })
  const { mutateAsync: updateVote } = useMutation({
    ...useUpdateVoteMutation(voteId ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: createdVotesKey() })
    },
  })

  const submit = useRef<boolean>(false)

  const onSubmit = async () => {
    if (submit.current) return
    submit.current = true

    try {
      let imageUrl = ''
      let imageName = ''

      if (image instanceof File) {
        imageName = image.name
        // 1. presigned URL 요청
        const { data: presignedRes } = await authAxiosInstance.post('/api/v1/image/presigned-url', {
          fileName: imageName,
        })
        if (presignedRes.message !== 'SUCCESS') {
          throw new Error('Presigned URL 발급 실패')
        }
        const { uploadUrl, fileUrl } = presignedRes.data

        // 2. 이미지 업로드 (PUT)
        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': image.type,
          },
          body: image,
        })

        if (!uploadRes.ok) {
          toast.error('이미지 업로드에 실패했습니다.')
        }

        imageUrl = fileUrl
      }
      if (typeof image === 'string') {
        imageUrl = image

        const urlParts = image.split('/')
        imageName = urlParts[urlParts.length - 1].split('?')[0]
      }

      if (voteId) {
        setIndex(1)
        navigation('/research')
        closeModal()
        await updateVote({ groupId, content, imageUrl, imageName, closedAt, anonymous })
        toast('투표를 수정했습니다.')
      } else {
        setIndex(1)
        navigation('/research')
        closeModal()
        await mutateAsync({
          groupId,
          content,
          imageUrl,
          imageName,
          closedAt,
          anonymous,
        })
        toast('투표를 등록했습니다.')
      }

      // eslint-disable-next-line no-unused-vars
    } catch (err: unknown) {
      submit.current = false // 재시도 가능하게
    } finally {
      trackEvent({
        cta_id: 'vote_submit',
        action: 'submit',
        page: location.pathname,
      })
    }
  }
  // keyboard 이벤츠 추가
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  return (
    <div className="flex flex-col justify-center items-center h-full w-[100svw] max-w-[450px] gap-4">
      <VoteCardPreview content={content} image={image} closedAt={closedAt} anonymous={anonymous} />
      <div className="text-xl text-white z-10 text-shadow-lg">
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
