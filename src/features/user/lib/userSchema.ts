import { z } from 'zod'

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '2자 이상 18자 이하 문자열입니다.')
    .max(18, '2자 이상 18자 이하 문자열입니다.'),
})
export type NicknameSchema = z.infer<typeof nicknameSchema>
// 초대코드 스키마
export const inviteCodeSchema = z.object({
  inviteCode: z.string().min(6, '6자 이상 8자 이하입니다.').max(8, '6자 이상 8자 이하입니다.'),
})
export type InviteCodeSchema = z.infer<typeof inviteCodeSchema>
// 유저 피드백 스키마
export const feedbackSchema = z.object({
  content: z.string().min(2, '2자 이상입니다.').max(500, '최대 500까지 입력 가능합니다.'),
})
export type FeedbackSchema = z.infer<typeof feedbackSchema>
