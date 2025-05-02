import * as z from 'zod'

export const voteSchema = z.object({
  groupId: z.number().min(1, { message: '그룹을 선택해 주세요.' }),
  content: z.string().min(2, { message: '최소 2자 이상' }).max(255, { message: '최대 255자 이하' }),
  image: z.custom<File | undefined>(
    (val) => val === undefined || val instanceof File,
    '지원 형식: JPEG, PNG (최대 10MB)',
  ),
  closedAt: z.string().min(1, '종료시간을 선택해주세요.'),
})
export type VoteSchema = z.infer<typeof voteSchema>
