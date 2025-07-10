import { NotificationType } from '@/api/services/notification/model'

export const messageMap: Record<string, { message: string; toastId: string }> = {
  // 400 에러
  INVALID_PROVIDER: { message: '지원하지 않는 소셜로그인 입니다.', toastId: 'BAD_REQUEST' },
  INVALID_CURSOR_FORMAT: {
    message: '다음 페이지 로딩에 문제가 발생했습니다.',
    toastId: 'BAD_REQUEST',
  },
  INVALID_NICKNAME: { message: '닉네임 입력이 잘못되었습니다.', toastId: 'BAD_REQUEST' },
  INVALID_CONTENT: { message: '투표 본문의 입력이 잘못되었습니다.', toastId: 'BAD_REQUEST' },
  INVALID_URL: { message: '첨부된 이미지가 잘못되었습니다.', toastId: 'BAD_REQUEST' },
  INVALID_TIME: { message: '종료 시간이 잘못 설정되었습니다.', toastId: 'BAD_REQUEST' },
  INVALID_INPUT: { message: '그룹 입력이 잘못되었습니다.', toastId: 'BAD_REQUEST' },
  INVALID_CODE_FORMAT: { message: '유효하지 않은 초대코드입니다.', toastId: 'BAD_REQUEST' },
  CANNOT_JOIN_PUBLIC_GROUP: {
    message: '공개그룹은 가입 시도가 불가능합니다.',
    toastId: 'BAD_REQUEST',
  },
  INVALID_FILE: { message: '첨부된 파일이 잘못되었습니다.', toastId: 'BAD_REQUEST' },

  // 403 에러
  NOT_GROUP_OWNER: { message: '그룹의 소유자가 아닙니다.', toastId: 'FORBIDDEN' },
  OWNER_CANNOT_LEAVE: {
    message: '그룹의 소유자는 그룹을 탈퇴할 수 없습니다.',
    toastId: 'FORBIDDEN',
  },
  MEMBERSHIP_NOT_FOUND: { message: '그룹에 가입되어 있지 않습니다.', toastId: 'FORBIDDEN' },
  FORBIDDEN: { message: '권한이 없습니다.', toastId: 'FORBIDDEN' },
  NOT_OWNER: { message: '소유자가 아닙니다.', toastId: 'FORBIDDEN' },

  // 404 에러
  OAUTH_NOT_FOUND: { message: '사용자가 존재하지 않습니다.', toastId: 'NOT_FOUND' },
  VOTE_NOT_FOUND: { message: '해당 투표가 존재하지 않습니다.', toastId: 'NOT_FOUND' },
  GROUP_NOT_FOUND: { message: '해당 그룹이 존재하지 않습니다.', toastId: 'NOT_FOUND' },
  INVITE_CODE_NOT_FOUND: { message: '해당 초대코드에 그룹이 없습니다.', toastId: 'NOT_FOUND' },
  FILE_NOT_FOUND: { message: '첨부된 파일이 존재하지 않습니다.', toastId: 'NOT_FOUND' },
  MODERATION_LOG_NOT_FOUND: { message: '검열 결과를 찾을 수 없습니다.', toastId: 'NOT_FOUND' },
  TOP_VOTE_NOT_FOUND: { message: '해당 랭킹 정보를 찾을 수 없습니다.', toastId: 'NOT_FOUND' },
  COMMENT_NOT_FOUND: { message: '해당 댓글을 찾을 수 없습니다.', toastId: 'NOT_FOUND' },
  NOTIFICATION_NOT_FOUND: { message: '해당 알림을 찾을 수 없습니다.', toastId: 'NOT_FOUND' },

  // 409 에러
  DUPLICATED_NICKNAME: { message: '동일한 닉네임이 이미 존재합니다.', toastId: 'CONFLICT' },
  ALREADY_VOTED: { message: '이미 참여한 투표입니다.', toastId: 'CONFLICT' },
  DUPLICATED_NAME: { message: '동일한 그룹이름이 이미 존재합니다.', toastId: 'CONFLICT' },
  ALREADY_JOINED: { message: '이미 가입된 그룹입니다.', toastId: 'CONFLICT' },
  CANNOT_KICK_SELF: { message: '소유자는 추방할 수 없습니다.', toastId: 'CONFLICT' },
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
