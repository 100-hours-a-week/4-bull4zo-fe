/*
초대코드 필터
영어
*/
export function filterInviteCode(input: string): string {
  return input.replace(/[^a-zA-Z0-9]/g, '')
}

/* 
기존 특수무자 필터링에 한글 "천지인" 키보드 예외 추가
한글, 영문, 숫자, 일부 특수문자(ㆍ, ᆞ, ᆢ, 초중성, 마침표, 공백)만 허용
*/
export function filterAllowedKoreanInput(input: string): string {
  return input.replace(/[^0-9a-zA-Z가-힣ㆍᆞᆢㄱ-ㅎㅏ-ㅣ. ]/gi, '')
}
