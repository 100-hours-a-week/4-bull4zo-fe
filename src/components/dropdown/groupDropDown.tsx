import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useInfiniteGroupNameListQuery } from '@/api/services/user/group/quries'
import { useVoteCardStore } from '@/features/home/stores/voteCardStore'
import { useGroupStore } from '@/stores/groupStore'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const GroupDropDown = () => {
  const { groups, setId, setGroups, selectedId } = useGroupStore()
  const { reset } = useVoteCardStore()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteGroupNameListQuery()

  useEffect(() => {
    if (isSuccess && data) {
      const fetchGroup = data.pages.flatMap((page) => page.groups ?? [])
      const allGroup = { groupId: 0, name: '전체' }

      const shouldIncludeAll = !location.pathname.includes('make')

      const updatedGroups = shouldIncludeAll
        ? [allGroup, ...fetchGroup.filter((g) => g.groupId !== null)]
        : fetchGroup.filter((g) => g.groupId !== null)

      setGroups(updatedGroups)
    }
  }, [isSuccess, data, setGroups, location.pathname])

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    if (!hasNextPage) return

    const timeout = setTimeout(() => {
      const target = loadMoreRef.current
      if (!target) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        },
        { rootMargin: '100px' },
      )

      observer.observe(target)

      return () => {
        observer.unobserve(target)
      }
    }, 0)

    return () => clearTimeout(timeout)
  }, [open, fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    reset()
  }, [reset, selectedId])

  const selectedGroup = groups.find((g) => g.groupId === selectedId)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="w-[10rem] justify-between py-1 text-sm" variant="outline">
          {selectedGroup?.name} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-[10rem] w-[10rem] overflow-y-auto bg-white"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuRadioGroup
          value={selectedId.toString()}
          onValueChange={(val) => setId(parseInt(val))}
        >
          {groups.map((group) => (
            <DropdownMenuRadioItem key={group.groupId} value={group.groupId.toString()}>
              {group.name}
            </DropdownMenuRadioItem>
          ))}
          <div ref={loadMoreRef} />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
