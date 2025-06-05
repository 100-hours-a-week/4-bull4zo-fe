import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, EllipsisVertical } from 'lucide-react'
import { toast } from 'sonner'
import { Group } from '@/api/services/group/model'
import { useLeaveGroupMutation } from '@/api/services/group/queries'
import { trackEvent } from '@/lib/trackEvent'
import { Card, CardContent, CardHeader } from '../ui/card'

export const GroupCard = (group: Partial<Group>) => {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(group.inviteCode as string)
    toast('초대코드 복사 완료')

    trackEvent({
      cta_id: 'code_copy',
      action: 'copy',
      page: location.pathname,
    })

    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  const toggleMenu = () => setOpen((prev) => !prev)

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  return (
    <Card className="flex flex-col rounded-[1.875rem] shadow-md border-none bg-white min-h-[9.5rem] gap-4">
      <CardHeader className="flex flex-row justify-between px-5">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 border rounded-full overflow-hidden flex items-center justify-center relative bg-gray-200 bg-cover bg-center"
            style={group.imageUrl ? { backgroundImage: `url(${group.imageUrl})` } : {}}
          />
          <h1 className="font-semibold text-lg">{group.name}</h1>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={toggleMenu}>
            <EllipsisVertical />
          </button>
          {open && (
            <GroupDotsItem
              isMine={group.role === 'MANAGER' || group.role === 'OWNER'}
              groupId={group.groupId!}
              setOpen={setOpen}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between h-full">
        <p className="font-medium mb-7">{group.description}</p>
        <pre className="font-medium flex items-center text-sm">
          초대코드:<span className="font-semibold">{group.inviteCode}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-primary ml-2 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </pre>
      </CardContent>
    </Card>
  )
}
const GroupDotsItem = ({
  isMine,
  groupId,
  setOpen,
}: {
  isMine: boolean
  groupId: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useNavigate()
  const { mutateAsync } = useLeaveGroupMutation(groupId)

  const handleLeaveGroup = async () => {
    await mutateAsync()
    toast.success('그룹을 떠났습니다.')
    setOpen(false)
  }

  return (
    <div className="absolute right-2 top-6 w-32 bg-white shadow-md rounded-2xl rounded-tr-none border-gray-300 border z-10">
      <button
        onClick={handleLeaveGroup}
        className="rounded-tl-2xl w-full px-3 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
      >
        떠나기
      </button>
      {isMine && (
        <>
          <hr className="text-gray-300" />
          <button
            onClick={() => router(`/group/${groupId}`)}
            className="rounded-b-2xl w-full px-3 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
          >
            그룹 관리
          </button>
        </>
      )}
    </div>
  )
}
