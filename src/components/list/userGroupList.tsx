import { useInfiniteGroupsQuery } from '@/api/services/group/queries'
import { AddGroupModal, Button, GroupList, Label } from '@/components/index'
import { useModalStore } from '@/stores/index'

export const UserGroupList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGroupsQuery(undefined)
  const { openModal } = useModalStore()

  return (
    <section className="mt-8">
      <Label className="text-2xl font-bold font-unbounded">그룹</Label>
      <Button
        onClick={() => openModal(<AddGroupModal />)}
        className="bg-gray-300 mt-3 w-full text-5xl h-full text-white rounded-[1.25rem] shadow-md"
      >
        +
      </Button>
      <GroupList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </section>
  )
}
