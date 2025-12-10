# MOA (모두의 Agenda)

<img width="250" height="250" alt="Image" src="https://github.com/user-attachments/assets/dad99664-f2f0-4658-8c91-7dc5ee583238" />

> 스와이프를 통해 다양한 투표에 참여해보세요!

## 📋 프로젝트 정보

- **프로젝트명**: MOA (모두의 Agenda)
- **프로젝트 설명**: 스와이프 기반의 직관적인 투표 플랫폼으로, 사용자들이 쉽고 재미있게 의견을 공유하고 조사할 수 있는 서비스입니다.
- **개발 기간**: 2025.04 ~ 2025.08
- **배포 주소**: [https://moagenda.com](https://moagenda.com)

## 👥 팀 소개

| 조건희 | 손지원    | 이유나 | 박준서 | 김용범 | 엄태성 |
| ------ | --------- | ------ | ------ | ------ | ------ |
| FE     | BE & 팀장 | Cloud  | Cloud  | AI     | AI     |

## 🎯 프로젝트 소개

MOA는 "**모두의 Agenda**"라는 의미로, 사용자들이 스와이프 제스처를 통해 직관적이고 재미있게 투표에 참여할 수 있는 웹 애플리케이션입니다.

### 주요 기능

- **스와이프 투표**: 카드 스와이프를 통해 간편하게 투표 참여
- **투표 생성 및 관리**: 다양한 형태의 투표 생성 및 수정
- **그룹 기능**: 그룹을 생성하고 관리하며 그룹 내 투표 공유
- **실시간 댓글**: Long Polling을 활용한 실시간 댓글 시스템
- **투표 조사**: 투표 결과 분석 및 상세 조사
- **사용자 인증**: 카카오 소셜 로그인 지원

## 🚀 시작 가이드

### 요구 사항

- **Node.js**: v18 이상
- **pnpm**: v8 이상 (또는 npm, yarn)

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/100-hours-a-week/4-bull4zo-fe.git

# 디렉토리 이동
cd 4-bull4zo-fe

# 패키지 설치
pnpm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 환경 변수 값을 설정합니다.

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm prd-build

# 빌드 미리보기
pnpm preview
```

## 🛠 기술 스택

### Frontend

- **Framework**: ![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
- **Language**: ![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-3178C6?logo=typescript)
- **Build Tool**: ![Vite](https://img.shields.io/badge/Vite-6.3.2-646CFF?logo=vite)
- **Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-38B2AC?logo=tailwind-css)

### State Management & Data Fetching

- **State Management**: ![Zustand](https://img.shields.io/badge/Zustand-5.0.3-FF6B6B)
- **Server State**: ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.74.3-FF4154?logo=react-query)

### UI & Animation

- **UI Components**: ![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-161618)
- **Animation**: ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.9.2-0055FF?logo=framer)
- **Icons**: ![Lucide React](https://img.shields.io/badge/Lucide_React-0.503.0-FF6B6B)

## 📱 화면 구성

| 홈                                                                                                                                 | 스와이프                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <img width="290" height="484" alt="Image" src="https://github.com/user-attachments/assets/068a63de-a0eb-49ee-92be-05ac17d222b2" /> | <img width="286" height="487" alt="Image" src="https://github.com/user-attachments/assets/ad7ba18b-e33e-41e5-8277-e9752d14763c" /> |
| 투표 등록                                                                                                                          | 투표 관리                                                                                                                          |
| <img width="361" height="753" alt="Image" src="https://github.com/user-attachments/assets/0da6bc2e-c863-43c8-9c01-640b6705fe3c" /> | <img width="363" height="750" alt="Image" src="https://github.com/user-attachments/assets/cdf7f800-3f0b-45ac-af09-ccb58998471d" /> |
| 투표 내 댓글                                                                                                                       | 그룹                                                                                                                               |
| <img width="363" height="751" alt="Image" src="https://github.com/user-attachments/assets/fdc4ffd7-72da-412d-bd7a-c86863d8447d" /> | <img width="363" height="755" alt="Image" src="https://github.com/user-attachments/assets/ffc1c1f7-aae8-462a-bbc9-13f63d4e2121" /> |
| 그룹 관리                                                                                                                          | 그룹 리포트                                                                                                                        |
| <img width="370" height="751" alt="Image" src="https://github.com/user-attachments/assets/1138b6bf-30de-4201-ae53-51c36c02aac8" /> | <img width="363" height="759" alt="Image" src="https://github.com/user-attachments/assets/5d33dc08-fe06-4897-96be-c1db36a6171d" /> |

## 🏗 아키텍처

<img width="682" height="492" alt="Image" src="https://github.com/user-attachments/assets/8d9a7724-9a63-4bc2-a40a-e4a4dd9599f8" />

## 📁 디렉토리 구조

```
MOA/
├── src/
│   ├── api/                   # API 관련
│   ├── app/                   # 앱 설정 및 라우팅
│   ├── assets/                # 정적 자산
│   ├── components/            # 공통 컴포넌트
│   ├── features/              # 기능별 모듈
│   ├── hooks/                 # 커스텀 훅
│   ├── lib/                   # 유틸리티 라이브러리
│   ├── mocks/                 # MSW 모킹
│   ├── stores/                # Zustand 스토어
│   ├── styles/                # 스타일 파일
│   ├── types/                 # TypeScript 타입 정의
│   └── utils/                 # 유틸리티 함수
├── public/                    # 공개 정적 파일
├── test/                      # 테스트 파일
│   └── e2e/                   # E2E 테스트
├── .storybook/                # Storybook 설정
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔧 주요 기능 상세

### 1. 스와이프 투표

- 카드 스와이프 제스처를 통한 직관적인 투표 참여
- Framer Motion을 활용한 부드러운 애니메이션

### 2. 투표 생성 및 관리

- React Hook Form과 Zod를 활용한 폼 검증
- 투표 카드 미리보기 기능
- 투표 수정 및 삭제 기능

### 3. 그룹 기능

- 그룹 생성 및 관리
- 그룹 멤버 관리
- 그룹별 투표 목록 조회
- 그룹 리포트 및 분석

### 4. 실시간 댓글

- Long Polling을 활용한 실시간 댓글 시스템
- 댓글 페이지네이션
- 댓글 생성 및 삭제

### 5. 투표 조사

- 투표 상세 정보 조회
- 투표 결과 분석
- 차트를 통한 시각화

### 6. 사용자 인증

- 카카오 소셜 로그인
- 로그인 없이 둘러보기 기능

## 📚 프로젝트 문서

- [🔗 MOA WIKI 바로가기](https://github.com/100-hours-a-week/4-bull4zo-wiki/wiki)
- [🔗 FE WIKI 바로가기](https://github.com/100-hours-a-week/4-bull4zo-fe/wiki)
