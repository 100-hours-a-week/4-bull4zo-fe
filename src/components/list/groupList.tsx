import { useEffect, useRef } from 'react'
import { useInfiniteGroupsQuery } from '@/api/services/group/queries'
import { GroupCard } from '../card/groupCard'

type GroupListProps = {
  data: ReturnType<typeof useInfiniteGroupsQuery>['data']
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const GroupList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: GroupListProps) => {
  const groups = data?.pages.flatMap((page) => page.groups) ?? []

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { rootMargin: '200px' },
    )
    const target = loadMoreRef.current
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  })

  return (
    <ul className="flex flex-col gap-4 pt-5">
      {groups.map((group) => (
        <GroupCard key={group.groupId} {...group} />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </ul>
  )
}
