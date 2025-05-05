import { z } from 'zod'

export const nicknameSchema = z.object({
  nickname: z.string().min(2, '2자 이상 10자 이하').max(10, '2자 이상 10자 이하'),
})
export type NicknameSchema = z.infer<typeof nicknameSchema>
