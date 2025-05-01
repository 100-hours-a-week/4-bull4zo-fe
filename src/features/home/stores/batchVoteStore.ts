import { create } from 'zustand'

type VoteChoice = '찬성' | '반대' | '기권'

interface Vote {
  voteId: number
  voteChoice: VoteChoice
}
interface VoteBatchStore {
  groupId: number
  selectVote: Vote[]
  // eslint-disable-next-line no-unused-vars
  setGroupId: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  addVote: (vote: Vote) => void
  resetVotes: () => void
}

export const useVoteBatchStore = create<VoteBatchStore>((set) => ({
  groupId: 1,
  selectVote: [],
  setGroupId: (id) => set({ groupId: id }),
  addVote: (vote) =>
    set((state) => ({
      selectVote: [...state.selectVote, vote],
    })),
  resetVotes: () => set({ selectVote: [] }),
}))
