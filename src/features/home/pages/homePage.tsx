import { useEffect } from 'react'
import { FaQuestion } from 'react-icons/fa'
import { useUserInfoQuery } from '@/api/services/user/queries'
import { useInfiniteVotesQuery } from '@/api/services/vote/queries'
import { VoteNoMoreCard } from '@/components/card/voteNoMoreCard'
import { GroupDropDown } from '@/components/dropdown/groupDropDown'
import { LoadingCard } from '@/components/loading/loadingCard'
import { NoVoteAvailAbleModal } from '@/components/modal/noVoteAvailableModal'
import { useGroupStore } from '@/stores/groupStore'
import { useModalStore } from '@/stores/modalStore'
import { useTutorialStore } from '@/stores/tutorialStore'
import { useUserStore } from '@/stores/userStore'
import { TutorialPage } from '../components/tutorial'
import VoteSwiperFramer from '../components/voteSwiper_framer'
import { useVoteCardStore } from '../stores/voteCardStore'

const HomePage = () => {
  const { isLogin, setIsLogin, setNickName } = useUserStore()
  const { selectedId: groupId } = useGroupStore()
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteVotesQuery({ groupId, isLogin })
  const { data: user } = useUserInfoQuery({ enabled: isLogin })

  const { openModal } = useModalStore()
  const { isHidden, open } = useTutorialStore()
  const { appendCards, filterByGroupId } = useVoteCardStore()

  const customFetchNextPage = () => {
    if (!isLogin) {
      openModal(<NoVoteAvailAbleModal />)
      return
    }
    fetchNextPage()
  }

  useEffect(() => {
    if (user) {
      setNickName(user.nickname || '')
    }
  }, [user, setNickName, setIsLogin])

  useEffect(() => {
    const lastPage = data?.pages.at(-1)
    if (lastPage?.votes) {
      appendCards(lastPage.votes)
    }
  }, [data?.pages, appendCards])

  useEffect(() => {
    filterByGroupId(groupId)
  }, [groupId, filterByGroupId])

  // 로딩 카드
  if (!isLogin && isLoading) {
    return (
      <div className="flex screen-minus-header-nav justify-center items-center">
        <LoadingCard />
      </div>
    )
  }
  // 더 이상 진행할 카드가 없는 경우 (에러 && 로그인 상황)
  if (isError) {
    return (
      <div className="flex screen-minus-header-nav justify-center items-center">
        <VoteNoMoreCard />
      </div>
    )
  }

  return (
    <article className="overflow-hidden screen-minus-header-nav">
      {isLogin && (
        <div className="absolute z-30 left-4 top-20">
          <GroupDropDown />
        </div>
      )}
      <div className="absolute z-30 right-4 top-22 cursor-help text-primary" onClick={() => open()}>
        <FaQuestion size={24} />
      </div>
      <VoteSwiperFramer
        fetchNextPage={customFetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      {!isHidden && <TutorialPage />}
    </article>
  )
}
export default HomePage
