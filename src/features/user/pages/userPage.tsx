import { Modal } from '@/components/modal/modal'
import { UserCard } from '@/features/user/components/userCard'
import { useModalStore } from '@/stores/modalStore'
import { UserGroupList } from '../components/userGroupList'

const UserPage = () => {
  const { isOpen } = useModalStore()

  return (
    <article className="px-5 py-5">
      <UserCard />
      <UserGroupList />
      {isOpen && <Modal />}
    </article>
  )
}
export default UserPage
