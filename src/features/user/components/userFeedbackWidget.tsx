import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserFeedbackMutation } from '@/api/services/user/quries'
import MESSAGEICON from '@/assets/message.png'
import MOALOGO from '@/assets/moa_logo.svg'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FeedbackSchema, feedbackSchema } from '../lib/userSchema'

type Props = {
  onClose: () => void
  rightOffset: number | null
}

export const UserFeedbackWidget = () => {
  const [open, setOpen] = useState(false)
  const [rightOffset, setRightOffset] = useState<number | null>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const container = document.querySelector('article')
    const updatePosition = () => {
      if (container) {
        const rect = container.getBoundingClientRect()
        const screenWidth = window.innerWidth
        const offset = screenWidth - rect.right + 20
        setRightOffset(offset)
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        onMouseUp={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        className="fixed bottom-16 z-[999] w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
        style={{ right: rightOffset ?? 16 }}
      >
        <img src={MOALOGO} alt="사용자 피드백 버튼 로고" />
      </button>

      {open && (
        <FeedbackForm
          onClose={() => setOpen(false)}
          rightOffset={rightOffset}
          buttonRef={buttonRef}
        />
      )}
    </>
  )
}

type FeedbackFormProps = Props & {
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export const FeedbackForm = ({ onClose, rightOffset, buttonRef }: FeedbackFormProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [mode, setMode] = useState<'form' | 'sent'>('form')
  const ignoreClickRef = useRef(true)

  const { mutate, isPending } = useUserFeedbackMutation()

  useEffect(() => {
    const timer = setTimeout(() => {
      ignoreClickRef.current = false
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleClickOutside = (e: MouseEvent) => {
      if (ignoreClickRef.current) return

      const target = e.target as Node
      if (
        ref.current &&
        !ref.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose, buttonRef])

  useEffect(() => {
    if (mode === 'form' && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [mode])

  const form = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  })

  const onSubmit = (data: FeedbackSchema) => {
    if (isPending) return

    mutate(data, {
      onSuccess: () => {
        setMode('sent')
        form.reset()
      },
    })
  }

  return (
    <>
      <div className="fixed inset-0 z-[998] bg-transparent" onClick={onClose} />

      <div
        ref={ref}
        className="fixed bottom-[8.5rem] min-h-[20rem] z-[999] w-80 px-3 py-7 bg-white rounded-xl shadow-xl transition-all animate-in slide-in-from-bottom duration-300"
        style={{ right: rightOffset ?? 16 }}
      >
        {mode === 'form' ? (
          <>
            <div className="text-center mb-4 text-[0.875rem]">
              서비스 이용은 어떠셨나요? <br />
              <br />
              좋았던 점이나 아쉬웠던 점이 있다면
              <br /> 자유롭게 의견을 남겨주세요.
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => {
                    const combinedRef = (el: HTMLTextAreaElement) => {
                      field.ref(el)
                      textareaRef.current = el
                    }

                    return (
                      <FormItem className="min-h-[8rem]">
                        <FormControl>
                          <textarea
                            {...field}
                            ref={combinedRef}
                            className="w-full min-h-[5rem] border p-2 rounded resize-none text-sm"
                            placeholder="의견을 남겨주세요"
                            maxLength={500}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <div className="flex justify-center mt-2">
                  <Button type="submit" className="bg-primary text-white" disabled={isPending}>
                    전달하기
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-between gap-4">
            <img src={MESSAGEICON} alt="메시지 아이콘" className="w-19 h-19" />
            <div className="text-center text-[0.95rem] font-medium mb-6 text-sm">
              감사합니다! <br /> 남겨주신 의견은 잘 전달되었습니다. <br /> 참고해서 더 편하게 쓸 수
              있게 만들어볼게요.
            </div>
            <div className="flex justify-center gap-4">
              <Button className="bg-gray-300 min-w-18" onClick={onClose}>
                닫기
              </Button>
              <Button
                className="bg-primary text-white min-w-18"
                onClick={() => {
                  setMode('form')
                }}
              >
                더 작성
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
