import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParticipatedVotesInfinityQuery } from '@/api/services/vote/queries'
import { VoteItem } from '@/components/index'
import { ScrollKeys, useScrollStore } from '@/stores/index'

type VoteListProps = {
  data: ReturnType<typeof useParticipatedVotesInfinityQuery>['data']
  fetchNextPage: () => void
  hasNextPage: boolean
}

export const VoteList = ({ data, fetchNextPage, hasNextPage }: VoteListProps) => {
  const votes = data?.pages.flatMap((page) => page.votes) ?? []
  const { setScroll, getScroll } = useScrollStore()
  // 스크롤 복원과 무한 스크롤의 충돌을 막기 위한 ref
  const hasRestoredScroll = useRef(false)
  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '100px' })

  // 다음 페이지 호출
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])
  // 스크롤 시 위치 저장
  useEffect(() => {
    const container = document.getElementById('main-content')
    if (!container) return

    const handleScroll = () => {
      clearTimeout((handleScroll as any).timer)
      ;(handleScroll as any).timer = setTimeout(() => {
        setScroll(ScrollKeys.research, container.scrollTop)
      }, 100)
    }

    container.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout((handleScroll as any).timer)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [setScroll])
  // 스크롤 위치 복원
  useEffect(() => {
    const container = document.getElementById('main-content')
    if (!container || hasRestoredScroll.current) return

    const timeout = setTimeout(() => {
      container.scrollTo({ top: getScroll('research') || 0 })
      hasRestoredScroll.current = true
    }, 0)

    return () => clearTimeout(timeout)
  }, [getScroll])

  return (
    <ul className="flex flex-col gap-4 pt-2">
      {votes.map((vote) => (
        <VoteItem key={vote?.voteId} {...vote} />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </ul>
  )
}
