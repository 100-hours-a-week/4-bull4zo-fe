// import { useCallback, useEffect, useRef } from 'react'
// import TinderCard from 'react-tinder-card'
// import { VoteData } from '@/api/services/vote/model'
// import { useSubmitVoteMutation } from '@/api/services/vote/quries'
// import { VoteCard } from '@/components/card/voteCard'
// import { VoteEndCard } from '@/components/card/voteEndCard'
// import { useUserStore } from '@/stores/userStore'

// // react-tinder-card로 애니메이션은 자연스럽지만 라벨 표시 불가능
// type Props = {
//   pages: VoteData[]
//   fetchNextPage: () => void
//   hasNextPage: boolean
//   isFetchingNextPage: boolean
// }

// const VoteSwiperTinder = ({ pages, fetchNextPage, hasNextPage, isFetchingNextPage }: Props) => {
//   const votes = pages.flatMap((page) => page.votes).reverse()
//   const { isLogin } = useUserStore()

//   const { addVote, selectVote, resetVotes } = useVoteBatchStore()
//   const { mutateAsync } = useSubmitVoteMutation()

//   // 5개 투표 batch 처리
//   const submitVotes = useCallback(async () => {
//     try {
//       await Promise.all(
//         selectVote.map(({ voteId, voteChoice }) => {
//           const userResponse = voteChoice === '기권' ? 0 : voteChoice === '찬성' ? 1 : 2
//           return mutateAsync({ voteId, userResponse })
//         }),
//       )
//     } catch (e) {
//       console.log(e)
//     }
//   }, [selectVote, mutateAsync])

//   // 스와이프
//   const onSwipe = useCallback(
//     async (direction: string, voteId: number) => {
//       const voteChoiceMap = {
//         right: '찬성',
//         left: '반대',
//         up: '기권',
//       } as const

//       const voteChoice = voteChoiceMap[direction as keyof typeof voteChoiceMap]
//       if (!voteChoice) return

//       addVote({ voteId, voteChoice })
//     },
//     [addVote],
//   )

//   // api 연결 후 무한스크롤 수정 필요
//   const fetchMoreCard = (index: number) => {
//     if (!hasNextPage) return

//     const target = loadMoreRef.current

//     if (!target) return

//     if (index === 0 && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage()
//     }
//   }

//   useEffect(() => {
//     if (selectVote.length >= 5) {
//       submitVotes()
//       resetVotes()
//     }
//   }, [selectVote, submitVotes, resetVotes])

//   const loadMoreRef = useRef<HTMLDivElement | null>(null)

//   return (
//     <div className="flex justify-center items-center h-full relative">
//       {isLogin && <VoteEndCard />}
//       {votes.map((vote, index) => {
//         const isLastCard = index === 0

//         return (
//           <TinderCard
//             key={vote?.voteId}
//             onSwipe={(dir) => {
//               onSwipe(dir, vote?.voteId as number)
//             }}
//             preventSwipe={['down']}
//             className="absolute"
//             onCardLeftScreen={() => fetchMoreCard(index)}
//           >
//             <div className="w-[90vw] max-w-max" ref={isLastCard ? loadMoreRef : null}>
//               <VoteCard {...vote} />
//             </div>
//           </TinderCard>
//         )
//       })}
//     </div>
//   )
// }
// export default VoteSwiperTinder
