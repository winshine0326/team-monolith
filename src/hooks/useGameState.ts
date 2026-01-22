import { create } from "zustand";
import type { GameState, Tile, FarmAction, CropType } from "@/types/game";
import { GAME_CONFIG, CROPS } from "@/lib/constants";

interface GameStore extends GameState {
  // 액션 실행
  executeActions: (actions: FarmAction[]) => void;
  // 씨앗 구매
  buySeed: (crop: CropType, amount: number) => void;
  // 수확 수입 리셋
  resetHarvestIncome: () => void;
  // 리셋
  reset: () => void;
}

// 초기 그리드 생성
function createInitialGrid(): Tile[][] {
  const grid: Tile[][] = [];
  for (let y = 0; y < GAME_CONFIG.GRID_SIZE; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < GAME_CONFIG.GRID_SIZE; x++) {
      row.push({
        x,
        y,
        state: "empty",
        growthProgress: 0,
      });
    }
    grid.push(row);
  }
  return grid;
}

// 초기 상태
const initialState: GameState = {
  gold: GAME_CONFIG.INITIAL_GOLD,
  seeds: { ...GAME_CONFIG.INITIAL_SEEDS },
  grid: createInitialGrid(),
  day: 1,
  lastHarvestIncome: null,
};

export const useGameState = create<GameStore>((set) => ({
  ...initialState,

  executeActions: (actions) =>
    set((state) => {
      const newState = { ...state };
      const newGrid = state.grid.map((row) => row.map((tile) => ({ ...tile })));
      let currentHarvestIncome = 0;

      for (const action of actions) {
        if (action.type === "plant") {
          const { x, y, crop } = action;

          // 유효성 검사
          if (
            x < 0 ||
            x >= GAME_CONFIG.GRID_SIZE ||
            y < 0 ||
            y >= GAME_CONFIG.GRID_SIZE
          ) {
            console.warn(`범위 벗어남: (${x}, ${y})`);
            continue;
          }

          const tile = newGrid[y][x];
          if (tile.state !== "empty") {
            console.warn(`이미 작물이 있음: (${x}, ${y})`);
            continue;
          }

          if (newState.seeds[crop] <= 0) {
            console.warn(`씨앗 부족: ${crop}`);
            continue;
          }

          // 심기
          tile.state = "planted";
          tile.crop = crop;
          tile.growthProgress = 0;
          newState.seeds[crop]--;
        }

        if (action.type === "water") {
          const { x, y } = action;

          // 유효성 검사
          if (
            x < 0 ||
            x >= GAME_CONFIG.GRID_SIZE ||
            y < 0 ||
            y >= GAME_CONFIG.GRID_SIZE
          ) {
            console.warn(`범위 벗어남: (${x}, ${y})`);
            continue;
          }

          const tile = newGrid[y][x];
          if (tile.state === "empty" || !tile.crop) {
            console.warn(`작물 없음: (${x}, ${y})`);
            continue;
          }

          if (tile.state === "ready") {
            console.warn(`이미 수확 가능: (${x}, ${y})`);
            continue;
          }

          // 물 주기
          const cropInfo = CROPS[tile.crop];
          tile.growthProgress += 100 / cropInfo.growthTime;

          if (tile.growthProgress >= 100) {
            tile.state = "ready";
            tile.growthProgress = 100;
          } else if (tile.growthProgress > 0) {
            tile.state = "growing";
          }
        }

        if (action.type === "water_all") {
          for (let y = 0; y < GAME_CONFIG.GRID_SIZE; y++) {
            for (let x = 0; x < GAME_CONFIG.GRID_SIZE; x++) {
              const tile = newGrid[y][x];
              if (
                tile.state !== "empty" &&
                tile.crop &&
                tile.state !== "ready"
              ) {
                const cropInfo = CROPS[tile.crop];
                tile.growthProgress += 100 / cropInfo.growthTime;

                if (tile.growthProgress >= 100) {
                  tile.state = "ready";
                  tile.growthProgress = 100;
                } else if (tile.growthProgress > 0) {
                  tile.state = "growing";
                }
              }
            }
          }
        }

        if (action.type === "harvest") {
          const { x, y } = action;

          // 유효성 검사
          if (
            x < 0 ||
            x >= GAME_CONFIG.GRID_SIZE ||
            y < 0 ||
            y >= GAME_CONFIG.GRID_SIZE
          ) {
            console.warn(`범위 벗어남: (${x}, ${y})`);
            continue;
          }

          const tile = newGrid[y][x];
          if (tile.state !== "ready" || !tile.crop) {
            console.warn(`수확 불가: (${x}, ${y})`);
            continue;
          }

          // 수확
          const cropInfo = CROPS[tile.crop];
          const income = cropInfo.sellPrice;
          newState.gold += income;
          currentHarvestIncome += income;

          // 타일 리셋
          tile.state = "empty";
          tile.crop = undefined;
          tile.growthProgress = 0;
        }

        if (action.type === "harvest_all") {
          for (let y = 0; y < GAME_CONFIG.GRID_SIZE; y++) {
            for (let x = 0; x < GAME_CONFIG.GRID_SIZE; x++) {
              const tile = newGrid[y][x];
              if (tile.state === "ready" && tile.crop) {
                const cropInfo = CROPS[tile.crop];
                const income = cropInfo.sellPrice;
                newState.gold += income;
                currentHarvestIncome += income;

                tile.state = "empty";
                tile.crop = undefined;
                tile.growthProgress = 0;
              }
            }
          }
        }
      }

      return {
        ...newState,
        grid: newGrid,
        lastHarvestIncome:
          currentHarvestIncome > 0 ? currentHarvestIncome : null,
      };
    }),

  buySeed: (crop, amount) =>
    set((state) => {
      const cropInfo = CROPS[crop];
      const cost = cropInfo.seedCost * amount;

      if (state.gold < cost) {
        return state; // 골드 부족 (UI에서 처리하지만 안전장치)
      }

      return {
        gold: state.gold - cost,
        seeds: {
          ...state.seeds,
          [crop]: state.seeds[crop] + amount,
        },
      };
    }),

  resetHarvestIncome: () => set({ lastHarvestIncome: null }),

  reset: () => set(initialState),
}));
