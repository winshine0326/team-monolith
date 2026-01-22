# Code Farm - 개발 TODO

## Phase 1: 프로젝트 셋업 (30분) ✅

### 의존성 설치
- [x] Tailwind CSS 설치 및 설정
- [x] shadcn/ui 초기화
- [x] Monaco Editor 설치 (`@monaco-editor/react`)
- [x] Zustand 설치
- [x] TanStack Query 설치
- [x] OpenAI SDK 설치

### 프로젝트 구조 생성
- [x] `src/components/` 폴더 생성
- [x] `src/hooks/` 폴더 생성
- [x] `src/lib/` 폴더 생성
- [x] `src/types/` 폴더 생성
- [x] 환경 변수 설정 (`.env` 파일)

---

## Phase 2: 코어 기능 (50분) ✅

### 타입 정의
- [x] `src/types/game.ts` 생성
  - [x] `CropType` 타입
  - [x] `TileState` 타입
  - [x] `Tile` 인터페이스
  - [x] `GameState` 인터페이스
  - [x] `CodeExecutionResult` 인터페이스
  - [x] `FarmAction` 타입

### 상수 정의
- [x] `src/lib/constants.ts` 생성
  - [x] `GAME_CONFIG` 상수
  - [x] 작물 정보 (carrot, tomato 등)
  - [x] 초기 게임 설정

### 농장 그리드 UI
- [x] `src/components/FarmTile.tsx` 생성
  - [x] 타일 상태별 이모지 표시 (🟫 🌱 🌿 🥕)
  - [x] 타일 클릭 이벤트 (선택 사항)
- [x] `src/components/FarmGrid.tsx` 생성
  - [x] 4x4 그리드 레이아웃
  - [x] FarmTile 렌더링

### 코드 에디터
- [x] `src/components/CodeEditor.tsx` 생성
  - [x] Monaco Editor 통합
  - [x] Python 문법 하이라이팅 설정
  - [x] 기본 템플릿 코드 제공
  - [x] 코드 상태 관리

### OpenAI API 연동
- [x] `src/lib/openai.ts` 생성
  - [x] OpenAI 클라이언트 초기화
  - [x] API 호출 함수
- [x] `src/lib/interpreter.ts` 생성
  - [x] 코드 해석 프롬프트 생성
  - [x] 액션 리스트 파싱
  - [x] 에러 핸들링

### 게임 상태 관리
- [x] `src/hooks/useGameState.ts` 생성
  - [x] Zustand 스토어 설정
  - [x] 초기 게임 상태 (gold: 100, 4x4 빈 그리드)
  - [x] 농장 액션 실행 함수 (plant, water, harvest)
  - [x] 골드/씨앗 업데이트 로직

### 코드 실행 로직
- [x] `src/hooks/useCodeExecution.ts` 생성
  - [x] TanStack Query 설정
  - [x] OpenAI API 호출
  - [x] 액션 리스트 적용

---

## Phase 3: 게임 로직 (25분) ✅

### UI 컴포넌트
- [x] `src/components/GameHeader.tsx` 생성
  - [x] 골드 표시 (💰 100G)
  - [x] 타이틀 표시 (🌾 Code Farm)
- [x] `src/components/ExecuteButton.tsx` 생성
  - [x] ▶️ 실행 버튼
  - [x] 🔄 리셋 버튼
  - [x] 로딩 상태 표시

### 경제 시스템
- [x] 씨앗 구매 로직
  - [x] 골드 차감
  - [x] 씨앗 재고 확인
- [x] 작물 판매 로직
  - [x] 수확 시 골드 증가
  - [x] 판매 가격 적용

### 미션 시스템
- [x] `src/components/MissionPanel.tsx` 생성
  - [x] 현재 미션 표시
  - [x] 힌트 표시
  - [x] 미션 완료 체크
- [x] `src/lib/missions.ts` 생성
  - [x] Mission 1: 첫 작물 심기
  - [x] Mission 2: 물 주기
  - [x] Mission 3: for문으로 심기
  - [x] Mission 4: 수확하기

---

## Phase 4: 통합 및 마무리 (15분)

### App.tsx 통합
- [ ] 레이아웃 구성 (2-column)
- [ ] 모든 컴포넌트 조합
- [ ] 전역 스타일 적용

### UI 폴리싱
- [ ] shadcn/ui 컴포넌트 적용 (Card, Button 등)
- [ ] 반응형 레이아웃 확인
- [ ] 농장 그리드 스타일링
- [ ] 에러 메시지 표시 개선

### 테스트 및 디버깅
- [ ] 기본 플로우 테스트
  - [ ] plant() 함수 동작 확인
  - [ ] water() 함수 동작 확인
  - [ ] harvest() 함수 동작 확인
  - [ ] for문 동작 확인
- [ ] 에러 케이스 확인
  - [ ] 잘못된 코드 입력 시
  - [ ] 골드 부족 시
  - [ ] 범위 벗어난 좌표

### 문서화
- [ ] README.md 업데이트
  - [ ] 프로젝트 설명
  - [ ] 실행 방법
  - [ ] 환경 변수 설정 가이드
  - [ ] 사용 가능한 함수 목록

---

## 선택 구현 (시간 여유 시)

- [ ] 코드 실행 애니메이션
- [ ] 작물 성장 애니메이션
- [ ] 에러 메시지 친절하게 개선
- [ ] 추가 작물 (토마토, 호박)
- [ ] 사운드 이펙트
- [ ] 미션 진행도 저장 (localStorage)
- [ ] 코드 예제 모음
- [ ] 다크모드 지원

---

## 체크리스트 (성공 기준)

- [ ] 코드 에디터에 파이썬 코드 작성 가능
- [ ] 실행 버튼 클릭 시 농장에 반영
- [ ] `plant()` 함수 동작
- [ ] `water()` 함수 동작
- [ ] `harvest()` 함수 동작
- [ ] `for`문 정상 동작
- [ ] 골드 시스템 작동
- [ ] 최소 1개 미션 완료 가능
