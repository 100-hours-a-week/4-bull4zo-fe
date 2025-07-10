import React, { HTMLAttributes, ReactNode, useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/index'
import { cn } from '@/lib/utils'

interface CardContextType {
  image?: File | string
  isPreview?: boolean
}

const CardContext = React.createContext<CardContextType | undefined>(undefined)

const useCardContext = () => {
  const context = useContext(CardContext)
  if (!context) throw new Error('card sub-component not found')
  return context
}

const useImageValidation = (file?: File | string) => {
  const [url, setUrl] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!file) return setIsValid(false)

    const src = typeof file === 'string' ? file : URL.createObjectURL(file)
    setUrl(src)

    const img = new Image()
    img.src = src
    img.onload = () => setIsValid(true)
    img.onerror = () => setIsValid(false)

    return () => {
      if (typeof file !== 'string') URL.revokeObjectURL(src)
    }
  }, [file])

  return { url, isValid }
}
// 최상단 레이아웃 컴포넌트
const Root = ({ image, isPreview, children }: CardContextType & { children: ReactNode }) => {
  const { url, isValid } = useImageValidation(image)

  return (
    <CardContext.Provider value={{ image, isPreview }}>
      <Card
        className={cn(
          `p-0 w-[80%] h-[30rem] max-h-[75%] border-none pointer-events-auto text-white rounded-[3.125rem] shadow-card text-shadow-lg`,
          !isValid && 'bg-primary-gradient-down',
        )}
        style={
          isValid
            ? {
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {children}
      </Card>
    </CardContext.Provider>
  )
}
// 헤더
const Header = ({
  children,
  className,
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <CardHeader className={cn('flex flex-row justify-between px-4 pt-9', className)}>
    {children}
  </CardHeader>
)
// 작성자
const Author = ({
  name,
  badge,
  isAI,
  children,
}: {
  name: string
  badge?: ReactNode
  isAI?: boolean
  children?: ReactNode
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex flex-row items-center gap-2">
      <CardTitle className="font-pyeojinGothic text-xl line-clamp-1">{name}</CardTitle>
      {badge}
      {isAI && (
        <div className="rounded-full bg-primary size-5 flex items-center justify-center border-white border-[1px] text-sm shadow-md">
          AI
        </div>
      )}
    </div>
    {children}
  </div>
)
// 그룹
const Group = ({ name }: { name?: string }) => {
  if (!name) return null
  return <span className="text-sm line-clamp-1">{name}</span>
}
// 종료 시간
const ClosedAt = ({ date }: { date?: string }) => (
  <span className="text-xs pr-2 min-w-20">{date}</span>
)
// 카드 내용
const Content = ({ children }: { children: ReactNode }) => (
  <CardContent className="flex-1 relative overflow-hidden px-4 pb-9">{children}</CardContent>
)
// 배경
const Overlay = () => {
  const { image } = useCardContext()
  const { isValid } = useImageValidation(image)
  if (!isValid) return null

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/40 to-transparent rounded-[3.125rem]" />
  )
}
// 본문 내용
const Body = ({ children }: { children: ReactNode }) => {
  const { image } = useCardContext()
  const { isValid } = useImageValidation(image)

  return (
    <div
      className={cn('min-h-[90%] flex justify-center px-2', isValid ? 'items-end' : 'items-center')}
    >
      <p className="sm:text-xl whitespace-pre-line break-all text-center py-2 z-30">{children}</p>
    </div>
  )
}
// card Modal Root
const ModalRoot = ({ children }: { children: ReactNode }) => (
  <Card
    className={cn(
      'px-4 py-9 w-[80%] h-[30rem] max-h-[75%] flex justify-center bg-primary-gradient-down text-white rounded-[3.125rem] shadow-card relative',
    )}
  >
    {children}
  </Card>
)
// card Modal Header
const ModalHeader = ({ children }: { children: ReactNode }) => (
  <CardHeader className={cn('flex flex-col justify-between w-full items-center px-0 text-black')}>
    {children}
  </CardHeader>
)
// card Modal Title
const ModalTitle = ({ children }: { children: ReactNode }) => (
  <CardTitle className="text-2xl">{children}</CardTitle>
)
// card Modal Content
const ModalContent = ({ children }: { children: ReactNode }) => (
  <CardContent className="flex flex-col justify-around items-center text-black">
    <div className="w-full flex justify-center gap-4">{children}</div>
  </CardContent>
)
const ModalFooter = ({ children }: { children: ReactNode }) => (
  <div className="absolute bottom-8 text-[0.75rem] text-center">
    <p>{children}</p>
  </div>
)

export const VCard = {
  Root,
  Header,
  Author,
  Group,
  ClosedAt,
  Content,
  Overlay,
  Body,
  ModalRoot,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
}
