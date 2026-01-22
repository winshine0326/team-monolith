// 작물 종류
export type CropType = "carrot" | "tomato" | "pumpkin";

// 타일 상태
export type TileState = "empty" | "planted" | "growing" | "ready";

// 개별 타일
export interface Tile {
  x: number;
  y: number;
  state: TileState;
  crop?: CropType;
  growthProgress: number; // 0-100
}

// 게임 전체 상태
export interface GameState {
  gold: number;
  seeds: Record<CropType, number>;
  grid: Tile[][];
  day: number;
}

// 코드 실행 결과
export interface CodeExecutionResult {
  success: boolean;
  actions: FarmAction[];
  error?: string;
  message?: string;
}

// 농장 액션 타입
export type FarmAction =
  | { type: "plant"; x: number; y: number; crop: CropType }
  | { type: "water"; x: number; y: number }
  | { type: "water_all" }
  | { type: "harvest"; x: number; y: number }
  | { type: "harvest_all" };

// 작물 정보
export interface CropInfo {
  name: string;
  seedCost: number;
  sellPrice: number;
  growthTime: number; // 물을 줘야 하는 횟수
  emoji: {
    planted: string;
    growing: string;
    ready: string;
  };
}
