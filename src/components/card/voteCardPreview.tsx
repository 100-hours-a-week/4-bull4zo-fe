import { useEffect, useState } from 'react'
import META_ICON from '@/assets/meta_icon.png'
import formatTime from '@/lib/formatTime'
import { useUserStore } from '@/stores/userStore'
import { Icon } from '../Icon/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type Props = {
  content: string
  image?: File
  closedAt: string
  anonymous: boolean
}

const usePreviewImageUrl = (file?: File) => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return url
}

export const VoteCardPreview = ({ content, image, closedAt, anonymous }: Props) => {
  const { nickname } = useUserStore()
  const imageUrl = usePreviewImageUrl(image)
  const [isImageValid, setIsImageValid] = useState(false)

  useEffect(() => {
    if (!imageUrl) return setIsImageValid(false)

    const img = new Image()
    img.src = imageUrl
    img.onload = () => setIsImageValid(true)
    img.onerror = () => setIsImageValid(false)
  }, [imageUrl])

  return (
    <Card
      className={` px-4 py-9 w-[90%] md:w-[70%] h-[30rem] max-h-[75%] ${!isImageValid ? 'bg-primary' : ''} text-white rounded-[3.125rem] shadow-card`}
      style={
        isImageValid
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <CardHeader className="flex flex-row justify-between px-0">
        {!anonymous ? (
          <div className="flex flex-row gap-1">
            <CardTitle className="font-unbounded text-xl line-clamp-1">{nickname}</CardTitle>
            <Icon src={META_ICON} alt="공인 뱃지" size={20} />
          </div>
        ) : (
          <div className="flex flex-row gap-1">
            <CardTitle className="font-unbounded text-2xl">익명</CardTitle>
          </div>
        )}
        <span className="text-xs pr-2 min-w-20">{formatTime(closedAt)}</span>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full overflow-y-auto">
        <p className="text-2xl">{content || '내용을 입력하세요.'}</p>
      </CardContent>
    </Card>
  )
}
