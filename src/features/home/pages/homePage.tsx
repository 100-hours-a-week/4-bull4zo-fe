import { useInfiniteVotesQuery } from '@/api/services/vote/quries'
import { VoteNoMoreCard } from '@/components/card/voteNoMoreCard'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { LoadingCard } from '@/components/loading/loadingCard'
import { Modal } from '@/components/modal/modal'
import { NoVoteAvailAbleModal } from '@/components/modal/noVoteAvailableModal'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import VoteSwiperFramer from '../components/voteSwiper_framer'

const HomePage = () => {
  const isLogin = useUserStore((state) => state.isLogin)
  const groupId = useGroupStore((state) => state.selectedId)
  const { data, isSuccess, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteVotesQuery({ groupId, isLogin })

  const { isOpen, openModal } = useModalStore()

  const customFetchNextPage = () => {
    if (!isLogin) {
      openModal(<NoVoteAvailAbleModal />)
      return
    }
    fetchNextPage()
  }

  if (isOpen) {
    return <Modal />
  }
  // 로딩 카드
  if (isFetching) {
    return (
      <div className="flex h-full justify-center items-center">
        <LoadingCard />
      </div>
    )
  }
  // 더 이상 진행할 카드가 없는 경우 (에러)
  if (isError) {
    return (
      <div className="flex h-full justify-center items-center">
        <VoteNoMoreCard />
      </div>
    )
  }
  return (
    <article className=" overflow-hidden h-full relative">
      {isLogin && (
        <div className="absolute z-10 left-4 top-3">
          <GroupDropDown />
        </div>
      )}
      {isSuccess && data?.pages && (
        <div className=" w-full h-full">
          <VoteSwiperFramer
            pages={data.pages}
            fetchNextPage={customFetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
    </article>
  )
}
export default HomePage
