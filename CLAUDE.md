# 🌾 Code Farm - PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 프로젝트 명

**Code Farm** - 파이썬으로 농장을 키우는 코딩 교육 게임

### 한 줄 설명

파이썬 문법으로 농장을 자동화하며 코딩을 배우는 웹 기반 교육 게임

### 핵심 가치

- **교육**: 실제 파이썬 문법 (for, if, while) 학습
- **성취감**: 내가 짠 코드로 농장이 돌아가는 경험
- **즐거움**: 게임처럼 재밌게 코딩 입문

### 타겟 유저

- 코딩 입문자
- 파이썬 기초를 배우고 싶은 학생
- 게이미피케이션으로 학습하고 싶은 사람

---

## 2. 기술 스택

| 분류           | 기술                         |
| -------------- | ---------------------------- |
| Framework      | React 18 + TypeScript        |
| UI             | shadcn/ui + Tailwind CSS     |
| State/Data     | TanStack Query + Zustand     |
| Code Editor    | Monaco Editor (VS Code 엔진) |
| Code Execution | OpenAI API                   |
| Build          | Vite                         |

---

## 3. 핵심 컨셉

### 🎮 게임 플로우

```
1. 농장 상태 확인 (4x4 그리드)
2. 코드 에디터에서 파이썬 코드 작성
3. ▶️ 실행 버튼 클릭
4. 코드가 실행되며 농장에 반영
5. 결과 확인 & 골드 획득
```

### 🐍 Code Farm 문법

**기본 파이썬 문법 유지:**

- `for`, `while` - 반복문
- `if`, `elif`, `else` - 조건문
- 변수, 연산자, 비교 등

**농장 전용 함수 (API):**

```python
# 🌱 심기
plant(x, y, "carrot")      # (x, y) 위치에 당근 심기
plant(x, y, "tomato")      # (x, y) 위치에 토마토 심기

# 💧 물주기
water(x, y)                # (x, y) 위치에 물주기
water_all()                # 전체 밭에 물주기

# 🥕 수확
harvest(x, y)              # (x, y) 위치 수확
harvest_all()              # 수확 가능한 모든 작물 수확

# 🔍 상태 확인
get_tile(x, y)             # 타일 정보 반환
is_ready(x, y)             # 수확 가능 여부 (True/False)
is_empty(x, y)             # 빈 땅 여부 (True/False)

# 🎒 인벤토리
get_gold()                 # 현재 골드
get_seeds("carrot")        # 당근 씨앗 개수
```

---

## 4. MVP 기능 범위 (2시간 내 구현)

### ✅ 필수 구현 (Core)

#### 4.1 농장 그리드

- 4x4 그리드 (16칸)
- 타일 상태 시각화: 빈땅 🟫 → 심음 🌱 → 성장 🌿 → 수확가능 🥕

#### 4.2 코드 에디터

- Monaco Editor 통합
- 문법 하이라이팅
- 기본 코드 템플릿 제공

#### 4.3 코드 실행

- OpenAI API로 코드 파싱 & 실행 결과 반환

#### 4.4 경제 시스템

- 시작 골드: 100G
- 당근 씨앗: 10G / 판매: 25G

#### 4.5 튜토리얼 미션

- Mission 1: `plant(0, 0, "carrot")` - 첫 작물 심기
- Mission 2: `water(0, 0)` - 물 주기
- Mission 3: `harvest(0, 0)` - 수확하기
- Mission 4: `for` 문으로 전체 밭에 심기

### ⏳ 선택 구현 (시간 여유시)

- [ ] 에러 메시지 친절하게 표시
- [ ] 코드 실행 애니메이션
- [ ] 추가 미션

---

## 5. 데이터 모델

### 5.1 타입 정의

```typescript
type CropType = "carrot" | "tomato" | "pumpkin";
type TileState = "empty" | "planted" | "growing" | "ready";

interface Tile {
  x: number;
  y: number;
  state: TileState;
  crop?: CropType;
  growthProgress: number; // 0-100
}

interface GameState {
  gold: number;
  seeds: Record<CropType, number>;
  grid: Tile[][];
  day: number;
}

interface CodeExecutionResult {
  success: boolean;
  actions: FarmAction[];
  error?: string;
}

type FarmAction =
  | { type: "plant"; x: number; y: number; crop: CropType }
  | { type: "water"; x: number; y: number }
  | { type: "harvest"; x: number; y: number };
```

---

## 6. UI 구조

```
┌─────────────────────────────────────────────────────────────┐
│  🌾 Code Farm                                    💰 100G   │
├─────────────────────────────┬───────────────────────────────┤
│                             │  # 코드를 작성하세요          │
│   🟫  🟫  🌱  🥕           │                               │
│   🟫  🌱  🌱  🟫           │  for x in range(4):           │
│   🥕  🟫  🟫  🌱           │      plant(x, 0, "carrot")    │
│   🟫  🌱  🥕  🟫           │                               │
│                             │                               │
│   (4x4 Farm Grid)          │  ┌─────────────────────────┐  │
│                             │  │ ▶️ 실행  │ 🔄 리셋    │  │
│                             │  └─────────────────────────┘  │
├─────────────────────────────┴───────────────────────────────┤
│  📋 미션: for문을 사용해서 첫 번째 줄에 당근을 심어보세요!  │
│  💡 힌트: range(4)는 0, 1, 2, 3을 반복해요                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. 코드 실행 방식 (OpenAI API)

```
사용자 코드 + 게임 상태 → OpenAI API → 액션 리스트 반환
```

**프롬프트 예시:**

```
당신은 Code Farm 게임의 파이썬 인터프리터입니다.
사용자 코드를 분석하여 농장 액션 리스트를 JSON으로 반환하세요.

현재 농장 상태: {...}
사용 가능한 함수: plant(x, y, crop), water(x, y), harvest(x, y)...

사용자 코드:
for x in range(4):
    plant(x, 0, "carrot")

응답 형식:
{ "actions": [...], "error": null }
```

---

## 8. 컴포넌트 구조

```
src/
├── components/
│   ├── FarmGrid.tsx        # 4x4 농장 그리드
│   ├── FarmTile.tsx        # 개별 타일
│   ├── CodeEditor.tsx      # Monaco 에디터 래퍼
│   ├── GameHeader.tsx      # 골드, 상태 표시
│   ├── MissionPanel.tsx    # 현재 미션 & 힌트
│   └── ExecuteButton.tsx   # 실행/리셋 버튼
├── hooks/
│   ├── useGameState.ts     # 게임 상태 관리
│   └── useCodeExecution.ts # 코드 실행 로직
├── lib/
│   ├── openai.ts           # OpenAI API 클라이언트
│   ├── interpreter.ts      # 코드 해석 로직
│   └── constants.ts        # 게임 상수
├── types/
│   └── game.ts
└── App.tsx
```

---

## 9. 게임 상수

```typescript
const GAME_CONFIG = {
  GRID_SIZE: 4,
  INITIAL_GOLD: 100,
  INITIAL_SEEDS: {
    carrot: 10,
    tomato: 5,
    pumpkin: 2,
  },
  CROPS: {
    carrot: {
      name: "당근",
      seedCost: 10,
      sellPrice: 25,
      growthTime: 3, // 턴
      emoji: { planted: "🌱", growing: "🌿", ready: "🥕" },
    },
    tomato: {
      name: "토마토",
      seedCost: 20,
      sellPrice: 50,
      growthTime: 5,
      emoji: { planted: "🌱", growing: "🌿", ready: "🍅" },
    },
  },
};
```

---

## 10. 튜토리얼 미션

```typescript
const MISSIONS = [
  {
    id: 1,
    title: "첫 번째 작물 심기",
    description: "plant(0, 0, 'carrot')을 입력해서 당근을 심어보세요!",
    hint: "plant(x, y, crop) 함수는 (x, y) 위치에 작물을 심어요",
    check: (state) => state.grid[0][0].state === 'planted'
  },
  {
    id: 2,
    title: "물 주기",
    description: "water(0, 0)으로 방금 심은 당근에 물을 주세요!",
    hint: "물을 주면 작물이 자라요",
    check: (state) => state.grid[0][0].growthProgress > 0
  },
  {
    id: 3,
    title: "반복문 배우기",
    description: "for문으로 첫 번째 줄 전체에 당근을 심어보세요!",
    hint: "for x in range(4): 는 x를 0부터 3까지 반복해요",
    code: "for x in range(4):\n    plant(x, 0, 'carrot')",
    check: (state) => state.grid[0].every(t => t.state === 'planted')
  },
  {
    id: 4,
    title: "조건문 배우기",
    description: "if문으로 수확 가능한 작물만 수확하세요!",
    hint: "is_ready(x, y)가 True면 수확 가능해요",
    code: "for x in range(4):\n    if is_ready(x, 0):\n        harvest(x, 0)",
    check: (state) => /* 수확 완료 체크 */
  }
];
```

---

## 11. 구현 순서

### Phase 1 (30분) - 프로젝트 셋업

1. Vite + React + TS 생성
2. Tailwind, shadcn/ui 설정
3. Monaco Editor 설치

### Phase 2 (50분) - 코어 기능

4. 농장 그리드 UI
5. 코드 에디터 통합
6. OpenAI API 연동 (코드 해석)
7. 액션 실행 로직

### Phase 3 (25분) - 게임 로직

8. 골드/씨앗 시스템
9. 미션 시스템 (1-2개)

### Phase 4 (15분) - 마무리

10. UI 폴리싱
11. README 작성
12. GitHub 푸시

---

## 12. 성공 기준

- [ ] 코드 에디터에 파이썬 코드 작성 가능
- [ ] 실행 버튼 클릭 시 농장에 반영
- [ ] `plant()`, `water()`, `harvest()` 함수 동작
- [ ] `for`문 정상 동작
- [ ] 골드 시스템 작동
- [ ] 최소 1개 미션 완료 가능
