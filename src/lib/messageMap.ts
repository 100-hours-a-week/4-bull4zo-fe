export const messageMap: Record<string, string> = {
  // 400 에러
  INVALID_PROVIDER: '지원하지 않는 소셜로그인 입니다.',
  INVALID_CURSOR_FORMAT: '다음 페이지 로딩에 문제가 발생했습니다.',
  INVALID_NICKNAME: '닉네임 입력이 잘못되었습니다.',
  INVALID_CONTENT: '투표 본문의 입력이 잘못되었습니다.',
  INVALID_URL: '첨부된 이미지가 잘못되었습니다.',
  INVALID_TIME: '종료 시간이 잘못 설정되었습니다.',
  INVALID_INPUT: '그룹 입력이 잘못되었습니다.',
  INVALID_CODE_FORMAT: '유효하지 않은 초대코드입니다.',
  CANNOT_JOIN_PUBLIC_GROUP: '공개그룹은 가입 시도가 불가능합니다.',

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
