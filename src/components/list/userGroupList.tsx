import { useInfiniteGroupsQuery } from '@/api/services/group/queries'
import { GroupList } from '@/components/list/groupList'
import { AddGroupModal } from '@/components/modal/addGroupModal'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'

export const UserGroupList = () => {
  const { isLogin } = useUserStore()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGroupsQuery(
    undefined,
    !!isLogin,
  )
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
