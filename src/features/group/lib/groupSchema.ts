import * as z from 'zod'
import { getContentLength } from '@/utils/textLength'

export const createGroupSchema = z.object({
  name: z.string().min(2, '최소 2자 이상의 문자열입니다.').max(12, '최대 12자의 문자열입니다.'),
  description: z
    .string()
    .min(2, '최소 2자 이상의 문자열입니다.')
    .refine((val) => getContentLength(val) <= 50, {
      message: '최대 50자까지 입력 가능합니다.',
    }),
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true
        return file?.length === 1
      },
      { message: '10MB 미만의 png, jpeg만 가능합니다.' },
    ),
})
export type CreateGroupSchema = z.infer<typeof createGroupSchema>
