import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
// import META_ICON from '@/assets/meta_icon.png'
import { useUserStore } from '@/stores/userStore'
import { formatRelativeTime } from '@/utils/time'
// import { Icon } from '../Icon/icon'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type Props = {
  content: string
  image?: File | string
  closedAt: string
  anonymous: boolean
}

const usePreviewImageUrl = (file?: File | string) => {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return
    }
    if (typeof file === 'string') {
      setUrl(file)
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
      className={cn(
        `p-0 w-[80%] h-[30rem] max-h-[75%] border-none pointer-events-auto text-white rounded-[3.125rem] shadow-card text-shadow-lg`,
        !isImageValid && 'bg-primary-gradient-down',
      )}
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
      <CardHeader className="flex flex-row justify-between px-4 pt-9">
        {!anonymous ? (
          <div className="flex flex-row gap-1">
            <CardTitle className="font-pyeojinGothic text-xl line-clamp-1">{nickname}</CardTitle>
            {/* <Icon src={META_ICON} alt="공인 뱃지" size={20} /> */}
          </div>
        ) : (
          <div className="flex flex-row gap-1">
            <CardTitle className="font-pyeojinGothic text-2xl">익명</CardTitle>
          </div>
        )}
        <span className="text-xs pr-2 min-w-20">{formatRelativeTime(closedAt, false)}</span>
      </CardHeader>
      <CardContent className="flex-1 relative overflow-hidden px-4 pb-9">
        {isImageValid && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/40 to-transparent rounded-[3.125rem]" />
        )}

        <div
          className={cn(
            'min-h-[90%] flex items-end justify-center px-2',
            !isImageValid && 'items-center',
          )}
        >
          <p
            data-testid="vote-content"
            className="sm:text-xl whitespace-pre-line break-all text-center py-2 z-30"
          >
            {content}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
