import { Modal } from '@/components/modal/modal'
import { UserCard } from '@/features/user/components/userCard'
import { useModalStore } from '@/stores/modalStore'

const UserPage = () => {
  const { isOpen } = useModalStore()

  return (
    <article className="px-5 py-5 mb-20">
      <UserCard />
      {isOpen && <Modal />}
    </article>
  )
}
export default UserPage
