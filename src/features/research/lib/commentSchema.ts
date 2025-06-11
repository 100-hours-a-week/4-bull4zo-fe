import { z } from 'zod'

export const commentSchema = z.object({
  content: z.string().trim().min(1, { message: '댓글을 입력해주세요.' }),
  anonymous: z.boolean(),
})
export type CommentSchema = z.infer<typeof commentSchema>
