export const messageMap: Record<string, string> = {
  // 404 에러의 경우
  OAUTH_NOT_FOUND: '사용자가 존재하지 않습니다.',
  VOTE_NOT_FOUND: '해당 투표가 존재하지 않습니다.',
  GROUP_NOT_FOUND: '해당 그룹이 존재하지 않습니다.',
  INVITE_CODE_NOT_FOUND: '해당 초대코드에 그룹이 없습니다.',

  // 409 에러의 경우
  DUPLICATED_NICKNAME: '동일한 닉네임이 이미 존재합니다.',
  ALREADY_VOTED: '이미 참여한 투표입니다.',
  DUPLICATED_NAME: '동일한 그룹이름이 이미 존재합니다.',
  ALREADY_JOINED: '이미 가입된 그룹입니다.',
}
