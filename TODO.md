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

## Phase 4: 통합 및 마무리 (15분) ✅

### App.tsx 통합

- [x] 레이아웃 구성 (2-column)
- [x] 모든 컴포넌트 조합
- [x] 전역 스타일 적용

### UI 폴리싱

- [x] shadcn/ui 컴포넌트 적용 (Card, Button 등)
- [x] 반응형 레이아웃 확인
- [x] 농장 그리드 스타일링
- [x] 에러 메시지 표시 개선
- [x] API 키 경고 UI 추가

### 완료된 기능

- [x] 기본 플로우 구현
  - [x] plant() 함수 동작
  - [x] water() 함수 동작
  - [x] harvest() 함수 동작
  - [x] for문 동작
- [x] 에러 처리
  - [x] OpenAI API 에러 핸들링
  - [x] 게임 로직 유효성 검사
  - [x] 범위 벗어난 좌표 처리

---

## 추가 기능 구현

### 상점 시스템

- [x] `src/components/Shop.tsx` 생성
  - [x] 씨앗 구매 UI
  - [x] 작물별 가격 표시
  - [x] 골드로 씨앗 구매 기능
  - [x] 구매 버튼 및 수량 선택
- [x] `useGameState.ts`에 구매 함수 추가
  - [x] `buySeed(crop, amount)` 함수
  - [x] 골드 차감 로직
  - [x] 씨앗 재고 증가
- [x] App.tsx에 상점 통합
  - [x] 상점 버튼/토글
  - [x] 레이아웃 조정

## 체크리스트 (성공 기준) ✅

- [x] 코드 에디터에 파이썬 코드 작성 가능
- [x] 실행 버튼 클릭 시 농장에 반영
- [x] `plant()` 함수 동작
- [x] `water()` 함수 동작
- [x] `harvest()` 함수 동작
- [x] `for`문 정상 동작
- [x] 골드 시스템 작동
- [x] 4개 미션 완료 가능
