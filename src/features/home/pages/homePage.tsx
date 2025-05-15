import { useEffect } from 'react'
// import { AiFillQuestionCircle } from 'react-icons/ai'
import { FaQuestion } from 'react-icons/fa'
import { useUserInfoQuery } from '@/api/services/user/quries'
import { useInfiniteVotesQuery } from '@/api/services/vote/quries'
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
  const { data: user } = useUserInfoQuery({ enabled: isLogin !== undefined })

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
    setNickName(user?.nickname || '')
  }, [user, setNickName])

  useEffect(() => {
    if (isLogin === undefined) {
      const timer = setTimeout(() => {
        setIsLogin(false)
      }, 1000) // 1초

      return () => clearTimeout(timer)
    }
  }, [isLogin, setIsLogin])

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
  if (isLoading || isLogin === undefined) {
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
