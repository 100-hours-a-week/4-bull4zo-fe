import * as z from 'zod'

export const createGroupSchema = z.object({
  name: z.string().min(2, '최소 2자 이상의 문자열입니다.').max(12, '최대 12자의 문자열입니다.'),
  description: z.string().min(2, '2 ~ 50자를 입력해주세요.').max(50, '2 ~ 50자를 입력해주세요.'),
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
