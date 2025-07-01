import { useNavigate } from 'react-router-dom'
import { Button, VCard } from '@/components/index'

export const VoteEndCard = () => {
  const navigation = useNavigate()

  return (
    <VCard.ModalRoot>
      <VCard.ModalHeader>
        <VCard.ModalTitle>모든 투표가 끝났습니다!</VCard.ModalTitle>
      </VCard.ModalHeader>
      <VCard.ModalContent>
        <Button
          className="px-7"
          onClick={() => {
            navigation('/research')
          }}
        >
          결과 보기
        </Button>
        <Button
          className="px-5"
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
