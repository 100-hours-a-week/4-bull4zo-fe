import { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FaQuestion } from 'react-icons/fa'
import { useUserInfoQuery } from '@/api/services/user/queries'
import { useInfiniteVotesQuery } from '@/api/services/vote/queries'
import { NotFoundPage } from '@/app/index'
import { GroupDropDown, LoadingCard, NoVoteAvailableModal } from '@/components/index'
import { useGroupStore, useModalStore, useTutorialStore, useUserStore } from '@/stores/index'
import { TutorialPage, VoteSwiperFramer } from '../components/index'
import { useVoteCardStore } from '../stores/voteCardStore'

const HomePage = () => {
  return (
    <ErrorBoundary fallbackRender={() => <NotFoundPage />}>
      <Suspense
        fallback={
          <div className="flex screen-minus-header-nav justify-center items-center">
            <LoadingCard />
          </div>
        }
      >
        <HomePageContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default HomePage

const HomePageContent = () => {
  const { isLogin, setIsLogin, setNickName } = useUserStore()
  const { selectedId: groupId } = useGroupStore()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteVotesQuery({
    groupId,
    isLogin,
  })
  const { data: user } = useUserInfoQuery({ enabled: isLogin })

  const { openModal } = useModalStore()
  const { isHidden, open } = useTutorialStore()
  const { appendCards, filterByGroupId } = useVoteCardStore()

  const customFetchNextPage = () => {
    if (!isLogin) {
      openModal(<NoVoteAvailableModal />)
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
