import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Group } from '@/api/services/group/model'
import { trackEvent } from '@/lib/trackEvent'
import { Card, CardContent, CardHeader } from '../ui/card'

export const GroupCard = (group: Partial<Group>) => {
  const [copied, setCopied] = useState(false)

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

  return (
    <Card className="flex flex-col rounded-2xl shadow-box border-2 min-h-54">
      <CardHeader className="flex flex-row justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 border rounded-[1rem] bg-gray-200 overflow-hidden flex items-center justify-center relative">
            {group.imageUrl && <img src={group.imageUrl} alt={group.name || 'Group image'} />}
          </div>
          <h1 className="font-bold text-[1.125rem]">{group.name}</h1>
        </div>
        {/* <EllipsisVertical /> */}
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between h-full">
        <p className="font-semibold">{group.description}</p>
        <div className="font-bold text-gray-400 flex items-center">
          초대코드: {group.inviteCode}{' '}
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-primary ml-2 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
