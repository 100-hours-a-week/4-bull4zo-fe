import { Vote } from '@/api/services/vote/model'
import META_ICON from '@/assets/meta_icon.webp'
import { VCard } from '@/components/index'
import { useGroupStore } from '@/stores/index'
import { formatRelativeTime } from '@/utils/time'
import { Icon } from '../../Icon/icon'

export const VoteCard = (props: Partial<Vote>) => {
  const { selectedId: groupId } = useGroupStore()

  return (
    <VCard.Root image={props.imageUrl} isPreview={false}>
      <VCard.Header>
        <VCard.Author
          name={props.authorNickname ?? ''}
          badge={props.adminVote === 1 && <Icon src={META_ICON} alt="공인 뱃지" size={20} />}
          isAI={props.voteType === 'AI'}
        >
          {groupId === 0 && <VCard.Group name={props.groupName} />}
        </VCard.Author>
        <VCard.ClosedAt date={formatRelativeTime(props.closedAt ?? '')} />
      </VCard.Header>
      <VCard.Content>
        <VCard.Overlay />
        <VCard.Body>{props.content}</VCard.Body>
      </VCard.Content>
    </VCard.Root>
  )
}
