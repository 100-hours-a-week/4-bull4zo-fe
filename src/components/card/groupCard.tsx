import { EllipsisVertical } from 'lucide-react'
import { Group } from '@/api/services/user/group/model'
import { Card, CardContent, CardHeader } from '../ui/card'

export const GroupCard = (group: Partial<Group>) => {
  return (
    <Card className="flex flex-col rounded-2xl shadow-box border-2 min-h-54">
      <CardHeader className="flex flex-row justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 border rounded-[1rem] bg-gray-200 overflow-hidden flex items-center justify-center relative">
            {group.imageUrl && <img src={group.imageUrl} />}
          </div>
          <h1 className="font-bold text-[1.125rem]">{group.name}</h1>
        </div>
        <EllipsisVertical />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between h-full">
        <p className="font-semibold">{group.description}</p>
        <span className="text-xs font-bold text-gray-400">초대코드: {group.inviteCode}</span>
      </CardContent>
    </Card>
  )
}
