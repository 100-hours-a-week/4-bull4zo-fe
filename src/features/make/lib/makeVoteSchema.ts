import * as z from 'zod'

export const voteSchema = z.object({
  groupId: z.number().min(1, { message: '그룹을 선택해 주세요.' }),
  content: z
    .string()
    .min(2, { message: '최소 2자 이상 입니다.' })
    .max(100, { message: '최대 100자 이하 입니다.' }),
  image: z.custom<File | undefined>(
    (val) => val === undefined || val instanceof File,
    '지원 형식: JPEG, PNG (최대 10MB)',
  ),
  closedAt: z.string().min(1, '종료시간을 선택해주세요.'),
  anonymous: z.boolean(),
})
export type VoteSchema = z.infer<typeof voteSchema>
