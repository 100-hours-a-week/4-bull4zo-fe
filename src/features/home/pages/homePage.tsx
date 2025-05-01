import { useInfiniteVotesQuery } from '@/api/services/vote/quries'
import { VoteNoMoreCard } from '@/components/card/voteCard'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { LoadingCard } from '@/components/loading/loadingCard'
import { Modal } from '@/components/modal/modal'
import { NoVoteAvailAbleModal } from '@/components/modal/noVoteAvailableModal'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import VoteSwiper from '../components/voteSwiper'

const HomePage = () => {
  const isLogin = useUserStore((state) => state.isLogin)
  const groupId = useGroupStore((state) => state.selectedId)
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteVotesQuery(
    { groupId, isLogin },
  )

  const { isOpen, openModal } = useModalStore()

  const FetchNextPage = () => {
    if (!isLogin) {
      openModal(<NoVoteAvailAbleModal />)
      return
    }
    fetchNextPage()
  }

  if (isOpen) {
    return <Modal />
  }

  return (
    <article className="px-5 py-4 overflow-hidden h-full relative">
      {isLogin && <GroupDropDown />}
      {!isSuccess && (
        <div className="flex justify-center items-center">
          <LoadingCard />
        </div>
      )}
      {isSuccess && data?.pages ? (
        <VoteSwiper
          pages={data.pages}
          fetchNextPage={FetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <div>
          <VoteNoMoreCard />
        </div>
      )}
    </article>
  )
}
export default HomePage
