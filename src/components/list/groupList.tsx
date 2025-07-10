import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { InfiniteData } from '@tanstack/react-query'
import { MyGroupList } from '@/api/services/group/model'
import { GroupCard } from '@/components/index'

type GroupListProps = {
  data: InfiniteData<MyGroupList>
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

  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '200px' })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <ul className="flex flex-col gap-4 pt-5">
      {groups.map((group) => (
        <GroupCard key={group.groupId} {...group} />
      ))}
      <div ref={loadMoreRef} className="h-1" />
    </ul>
  )
}
