import { NotificationType } from '@/api/services/notification/model'

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
  INVALID_FILE: '첨부된 파일이 잘못되었습니다.',

  // 403 에러의 경우
  NOT_GROUP_OWNER: '그룹의 소유자가 아닙니다.',
  OWNER_CANNOT_LEAVE: '그룹의 소유자는 그룹을 탈퇴할 수 없습니다.',
  MEMBERSHIP_NOT_FOUND: '그룹에 가입되어 있지 않습니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_OWNER: '소유자가 아닙니다.',

  // 404 에러의 경우
  OAUTH_NOT_FOUND: '사용자가 존재하지 않습니다.',
  VOTE_NOT_FOUND: '해당 투표가 존재하지 않습니다.',
  GROUP_NOT_FOUND: '해당 그룹이 존재하지 않습니다.',
  INVITE_CODE_NOT_FOUND: '해당 초대코드에 그룹이 없습니다.',
  FILE_NOT_FOUND: '첨부된 파일이 존재하지 않습니다.',
  MODERATION_LOG_NOT_FOUND: '검열 결과를 찾을 수 없습니다.',
  TOP_VOTE_NOT_FOUND: '해당 랭킹 정보를 찾을 수 없습니다.',
  COMMENT_NOT_FOUND: '해당 댓글을 찾을 수 없습니다.',
  NOTIFICATION_NOT_FOUND: '해당 알림을 찾을 수 없습니다.',

  // 409 에러의 경우
  DUPLICATED_NICKNAME: '동일한 닉네임이 이미 존재합니다.',
  ALREADY_VOTED: '이미 참여한 투표입니다.',
  DUPLICATED_NAME: '동일한 그룹이름이 이미 존재합니다.',
  ALREADY_JOINED: '이미 가입된 그룹입니다.',
  CANNOT_KICK_SELF: '소유자는 추방할 수 없습니다.',
}

// 투표 생성 실패 메시지
export const voteCreateFailMessage = {
  OFFENSIVE_LANGUAGE: '욕설 또는 비방이 포함되어 있어요.',
  POLITICAL_CONTENT: '정치적인 내용이 포함되어 있어요.',
  SEXUAL_CONTENT: '음란하거나 선정적인 내용이에요.',
  SPAM_ADVERTISEMENT: '스팸 또는 광고로 보여요.',
  IMPERSONATION_OR_LEAK: '사칭, 사기, 개인정보 노출이 의심돼요.',
  OTHER: '부적절하다고 판단돼요.',
}

// 알림 타입별 제목 메세지
export const notificationMessageMap: Record<NotificationType, string> = {
  MY_VOTE_CLOSED: '내가 만든 투표 종료',
  SUBMITTED_VOTE_CLOSED: '참여한 투표 종료',
  VOTE_APPROVED: '투표 등록 성공',
  VOTE_REJECTED: '투표 등록 실패',
  MY_VOTE_COMMENT: '내 투표에 댓글',
  TOP3_UPDATED: 'Top3 투표 알림',
  GROUP_DELETED: '가입한 그룹 삭제',
}
