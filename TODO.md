# Code Farm - 개발 TODO

## Phase 1: 프로젝트 셋업 (30분)

### 의존성 설치
- [ ] Tailwind CSS 설치 및 설정
- [ ] shadcn/ui 초기화
- [ ] Monaco Editor 설치 (`@monaco-editor/react`)
- [ ] Zustand 설치
- [ ] TanStack Query 설치
- [ ] OpenAI SDK 설치

### 프로젝트 구조 생성
- [ ] `src/components/` 폴더 생성
- [ ] `src/hooks/` 폴더 생성
- [ ] `src/lib/` 폴더 생성
- [ ] `src/types/` 폴더 생성
- [ ] 환경 변수 설정 (`.env` 파일)

---

## Phase 2: 코어 기능 (50분)

### 타입 정의
- [ ] `src/types/game.ts` 생성
  - [ ] `CropType` 타입
  - [ ] `TileState` 타입
  - [ ] `Tile` 인터페이스
  - [ ] `GameState` 인터페이스
  - [ ] `CodeExecutionResult` 인터페이스
  - [ ] `FarmAction` 타입

### 상수 정의
- [ ] `src/lib/constants.ts` 생성
  - [ ] `GAME_CONFIG` 상수
  - [ ] 작물 정보 (carrot, tomato 등)
  - [ ] 초기 게임 설정

### 농장 그리드 UI
- [ ] `src/components/FarmTile.tsx` 생성
  - [ ] 타일 상태별 이모지 표시 (🟫 🌱 🌿 🥕)
  - [ ] 타일 클릭 이벤트 (선택 사항)
- [ ] `src/components/FarmGrid.tsx` 생성
  - [ ] 4x4 그리드 레이아웃
  - [ ] FarmTile 렌더링

### 코드 에디터
- [ ] `src/components/CodeEditor.tsx` 생성
  - [ ] Monaco Editor 통합
  - [ ] Python 문법 하이라이팅 설정
  - [ ] 기본 템플릿 코드 제공
  - [ ] 코드 상태 관리

### OpenAI API 연동
- [ ] `src/lib/openai.ts` 생성
  - [ ] OpenAI 클라이언트 초기화
  - [ ] API 호출 함수
- [ ] `src/lib/interpreter.ts` 생성
  - [ ] 코드 해석 프롬프트 생성
  - [ ] 액션 리스트 파싱
  - [ ] 에러 핸들링

### 게임 상태 관리
- [ ] `src/hooks/useGameState.ts` 생성
  - [ ] Zustand 스토어 설정
  - [ ] 초기 게임 상태 (gold: 100, 4x4 빈 그리드)
  - [ ] 농장 액션 실행 함수 (plant, water, harvest)
  - [ ] 골드/씨앗 업데이트 로직

### 코드 실행 로직
- [ ] `src/hooks/useCodeExecution.ts` 생성
  - [ ] TanStack Query 설정
  - [ ] OpenAI API 호출
  - [ ] 액션 리스트 적용

---

## Phase 3: 게임 로직 (25분)

### UI 컴포넌트
- [ ] `src/components/GameHeader.tsx` 생성
  - [ ] 골드 표시 (💰 100G)
  - [ ] 타이틀 표시 (🌾 Code Farm)
- [ ] `src/components/ExecuteButton.tsx` 생성
  - [ ] ▶️ 실행 버튼
  - [ ] 🔄 리셋 버튼
  - [ ] 로딩 상태 표시

### 경제 시스템
- [ ] 씨앗 구매 로직
  - [ ] 골드 차감
  - [ ] 씨앗 재고 확인
- [ ] 작물 판매 로직
  - [ ] 수확 시 골드 증가
  - [ ] 판매 가격 적용

### 미션 시스템
- [ ] `src/components/MissionPanel.tsx` 생성
  - [ ] 현재 미션 표시
  - [ ] 힌트 표시
  - [ ] 미션 완료 체크
- [ ] `src/lib/missions.ts` 생성
  - [ ] Mission 1: 첫 작물 심기
  - [ ] Mission 2: 물 주기
  - [ ] Mission 3: for문으로 심기 (선택)
  - [ ] Mission 4: if문으로 수확 (선택)

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
