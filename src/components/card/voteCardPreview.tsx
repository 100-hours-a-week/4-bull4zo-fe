import { VCard } from '@/components/index'
import { useUserStore } from '@/stores/index'
import { formatRelativeTime } from '@/utils/time'

type Props = {
  content: string
  image?: File | string
  closedAt: string
  anonymous: boolean
}

export const VoteCardPreview = ({ content, image, closedAt, anonymous }: Props) => {
  const { nickname } = useUserStore()

  return (
    <VCard.Root image={image}>
      <VCard.Header>
        <VCard.Author name={!anonymous ? nickname : '익명'} badge={null} />
        <VCard.ClosedAt date={formatRelativeTime(closedAt)} />
      </VCard.Header>
      <VCard.Content>
        <VCard.Overlay />
        <VCard.Body>{content}</VCard.Body>
      </VCard.Content>
    </VCard.Root>
  )
}
