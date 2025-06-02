import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useInfiniteGroupNameListQuery } from '@/api/services/group/queries'
import { trackEvent } from '@/lib/trackEvent'
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
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
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

  const selectedGroup = groups.find((g) => g.groupId === selectedId)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild style={{ padding: 0, paddingLeft: '12px' }}>
        <Button
          className="w-[10rem] justify-between border-none overflow-hidden text-sm shadow-md hover:bg-white"
          variant="outline"
          data-testid="group-dropdown-trigger"
          disabled={isError}
        >
          {isError ? '그룹 호출 실패' : selectedGroup?.name}
          <div className="bg-primary h-full w-[30px] flex items-center justify-center">
            <ChevronDown className="w-6 h-6" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-[10rem] w-[10rem] overflow-y-auto bg-white border-none"
        onCloseAutoFocus={(e) => e.preventDefault()}
        data-testid="group-dropdown-content"
      >
        <DropdownMenuRadioGroup
          value={selectedId.toString()}
          onValueChange={(val) => {
            setId(parseInt(val))
            trackEvent({
              cta_id: 'group_dropdown_select',
              action: 'select',
              page: location.pathname,
            })
          }}
          data-testid="group-dropdown-group"
        >
          {groups.map((group) => (
            <DropdownMenuRadioItem
              key={group.groupId}
              value={group.groupId.toString()}
              data-testid={`group-item-${group.groupId}`}
            >
              {group.name}
            </DropdownMenuRadioItem>
          ))}
          <div ref={loadMoreRef} />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
