import * as z from 'zod'

export const createGroupSchema = z.object({
  name: z.string().min(2, '2 ~ 12자를 입력해주세요.').max(12, '2 ~ 12자를 입력해주세요.'),
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
