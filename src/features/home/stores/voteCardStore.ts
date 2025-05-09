import { create } from 'zustand'
import { Vote } from '@/api/services/vote/model'

type VoteCardStore = {
  cards: Vote[]
  removedIds: Set<number>
  // eslint-disable-next-line no-unused-vars
  appendCards: (newVotes: Vote[]) => void
  // eslint-disable-next-line no-unused-vars
  removeCard: (voteId: number) => void
  // eslint-disable-next-line no-unused-vars
  filterByGroupId: (groupId: number) => void // ✅ 추가
  reset: () => void
}

export const useVoteCardStore = create<VoteCardStore>((set) => ({
  cards: [],
  removedIds: new Set(),

  appendCards: (newVotes) =>
    set((state) => {
      const existingVotes = new Map(state.cards.map((v) => [v.voteId, v]))
      const removedIds = state.removedIds

      const mergedVotes = newVotes.map((v) => existingVotes.get(v.voteId) ?? v)

      return {
        cards: [
          ...state.cards,
          ...mergedVotes.filter((v) => !existingVotes.has(v.voteId) && !removedIds.has(v.voteId)),
        ],
        removedIds: new Set(removedIds), // 그대로 유지
      }
    }),

  removeCard: (voteId) =>
    set((state) => {
      const newRemoved = new Set(state.removedIds)
      newRemoved.add(voteId)
      return {
        cards: state.cards.filter((v) => v.voteId !== voteId),
        removedIds: newRemoved,
      }
    }),

  filterByGroupId: (groupId) =>
    set((state) => ({
      cards: groupId === 0 ? state.cards : state.cards.filter((vote) => vote.groupId === groupId),
    })),

  reset: () => set({ cards: [], removedIds: new Set<number>() }),
}))
