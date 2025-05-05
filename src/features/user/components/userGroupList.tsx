import { useInfiniteGroupsQuery } from '@/api/services/user/group/quries'
import { GroupList } from '@/components/list/groupList'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export const UserGroupList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGroupsQuery()

  return (
    <section className="mt-8">
      <Label className="text-2xl font-bold font-unbounded">그룹</Label>
      <Button className="bg-gray-300 mt-3 w-full text-5xl h-full text-white">+</Button>
      <GroupList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </section>
  )
}
