import React, { forwardRef, memo, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLocation } from 'react-router-dom'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { infiniteGroupNameListQueryOptions } from '@/api/services/group/queries'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/index'
import { trackEvent } from '@/lib/trackEvent'
import { useGroupStore } from '@/stores/index'

export const GroupDropDown = React.memo(function GroupDropDown() {
  const { groups, setId, setGroups, selectedId } = useGroupStore()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useSuspenseInfiniteQuery(infiniteGroupNameListQueryOptions())

  const selectRef = useRef<HTMLDivElement | null>(null)

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

  const { ref: loadMoreRef, inView } = useInView({ rootMargin: '100px' })

  useEffect(() => {
    if (open && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [open, inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  const selectedGroup = groups.find((g) => g.groupId === selectedId)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild style={{ padding: 0, paddingLeft: '12px' }}>
        <Button
          className="w-[10rem] justify-between border-none overflow-hidden text-sm shadow-md hover:bg-white cursor-pointer"
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
        onOpenAutoFocus={(e) => {
          e.preventDefault()
          selectRef.current?.focus()
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
        data-testid="group-dropdown-content"
      >
        {open && (
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
              <GroupItem
                key={group.groupId}
                group={group}
                isSelected={group.groupId === selectedId}
                ref={selectRef}
              />
            ))}
            <div ref={loadMoreRef} />
          </DropdownMenuRadioGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

type GroupItemProps = {
  group: { groupId: number; name: string }
  isSelected: boolean
}

export const GroupItem = memo(
  forwardRef<HTMLDivElement, GroupItemProps>(({ group, isSelected }, ref) => (
    <DropdownMenuRadioItem
      value={group.groupId.toString()}
      data-testid={`group-item-${group.groupId}`}
      className="cursor-pointer"
      ref={isSelected ? ref : undefined}
      tabIndex={0}
    >
      {group.name}
    </DropdownMenuRadioItem>
  )),
  (prev, next) => prev.group.groupId === next.group.groupId && prev.isSelected === next.isSelected,
)
