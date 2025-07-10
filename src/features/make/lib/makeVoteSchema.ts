import * as z from 'zod'
import { getContentLength } from '@/utils/textLength'

export const voteSchema = z.object({
  groupId: z.number().min(1, { message: '그룹을 선택해 주세요.' }),
  content: z
    .string()
    .min(2, { message: '최소 2자 이상 입니다.' })
    .refine((val) => getContentLength(val) <= 100, {
      message: '최대 100자 이하 입니다.',
    }),
  image: z.union([z.instanceof(File), z.undefined()]).refine(
    (val) => {
      if (val instanceof File) {
        const isActuallyAFile = val.size > 0 && val.type.startsWith('image/')
        const isValidType = ['image/png', 'image/jpeg'].includes(val.type)
        const isValidExtension = /\.(png|jpe?g)$/i.test(val.name)
        const isValidSize = val.size <= 10 * 1024 * 1024 // 10MB
        const isValidImage = isActuallyAFile && isValidType && isValidExtension && isValidSize

        // 폴더 여부 검사
        const isDisguisedFolder = val.size < 1024 || val.lastModified === 0

        return isValidImage && !isDisguisedFolder
      }
      return true
    },
    { message: '지원 형식: PNG, JPEG (최대 10MB)' },
  ),
  closedAt: z.string().min(1, '종료시간을 선택해주세요.'),
  anonymous: z.boolean(),
})
export type VoteSchema = z.infer<typeof voteSchema>
