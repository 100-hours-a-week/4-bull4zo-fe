import { useNavigate } from 'react-router-dom'
import { Button, VCard } from '@/components/index'
import { useUserStore } from '@/stores/index'

export const VoteNoMoreCard = () => {
  const navigation = useNavigate()
  const { isLogin } = useUserStore()

  return (
    <VCard.ModalRoot>
      <VCard.ModalHeader>
        <VCard.ModalTitle>
          지금은 잠잠하네요...
          <br /> 새로운 투표가 없습니다.
        </VCard.ModalTitle>
      </VCard.ModalHeader>
      <VCard.ModalContent>
        <Button
          className="px-5"
          disabled={!isLogin}
          onClick={() => {
            navigation('/make')
          }}
        >
          새 투표 만들기
        </Button>
        <VCard.ModalFooter>
          💬 그룹을 '전체'로 바꾸면 더 많은 투표를 볼 수 있어요!
        </VCard.ModalFooter>
      </VCard.ModalContent>
    </VCard.ModalRoot>
  )
}
