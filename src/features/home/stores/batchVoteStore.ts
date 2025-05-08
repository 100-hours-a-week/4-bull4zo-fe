import { create } from 'zustand'

export type VoteChoice = '찬성' | '반대' | '기권' | null

export interface VoteStore {
  voteId: number
  voteChoice: VoteChoice
}
interface VoteBatchStore {
  groupId: number
  selectVote: VoteStore[]
  // eslint-disable-next-line no-unused-vars
  setGroupId: (id: number) => void
  // eslint-disable-next-line no-unused-vars
  addVote: (vote: VoteStore) => void
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
