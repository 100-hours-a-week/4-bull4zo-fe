import { useVoteBatchStore } from '@/features/home/stores/batchVoteStore'
import { useVoteCardStore } from '@/features/home/stores/voteCardStore'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { useUserStore } from '@/stores/userStore'

export const fullReset = () => {
  useUserStore.getState().logout()
  useModalStore.getState().closeModal()
  useNavigationStore.getState().reset()
  useGroupStore.getState().reset()
  useVoteCardStore.getState().reset()
  useVoteBatchStore.getState().resetVotes()
}
