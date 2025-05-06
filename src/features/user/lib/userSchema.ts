import { z } from 'zod'

export const nicknameSchema = z.object({
  nickname: z.string().min(2, '2자 이상 10자 이하').max(10, '2자 이상 10자 이하'),
})
export type NicknameSchema = z.infer<typeof nicknameSchema>

export const inviteCodeSchema = z.object({
  inviteCode: z.string().min(6, '6자 이상 8자 이하').max(8, '6자 이상 8자 이하'),
})
export type InviteCodeSchema = z.infer<typeof inviteCodeSchema>
