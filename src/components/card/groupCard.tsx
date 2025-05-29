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
    <Card className="flex flex-col rounded-[1.875rem] shadow-md border-none bg-white min-h-[9.5rem] gap-4">
      <CardHeader className="flex flex-row justify-between px-5">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 border rounded-full overflow-hidden flex items-center justify-center relative bg-gray-200 bg-cover bg-center"
            style={group.imageUrl ? { backgroundImage: `url(${group.imageUrl})` } : {}}
          />
          <h1 className="font-semibold text-lg">{group.name}</h1>
        </div>
        {/* <EllipsisVertical /> */}
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
