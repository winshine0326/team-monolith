import type { CropInfo, CropType } from "@/types/game";
import carrotImg from "@/assets/vegetables/carrot.svg";
import tomatoImg from "@/assets/vegetables/tomato.svg";
import pumpkinImg from "@/assets/vegetables/pumpkin.svg";

// 게임 기본 설정
export const GAME_CONFIG = {
  GRID_SIZE: 4,
  INITIAL_GOLD: 100,
  INITIAL_SEEDS: {
    carrot: 10,
    tomato: 5,
    pumpkin: 2,
  } as Record<CropType, number>,
};

// 작물 정보
export const CROPS: Record<CropType, CropInfo> = {
  carrot: {
    name: "당근",
    seedCost: 10,
    sellPrice: 25,
    growthTime: 3, // 물 3번
    emoji: {
      planted: "🌱",
      growing: "🌿",
      ready: carrotImg,
    },
  },
  tomato: {
    name: "토마토",
    seedCost: 20,
    sellPrice: 50,
    growthTime: 5, // 물 5번
    emoji: {
      planted: "🌱",
      growing: "🌿",
      ready: tomatoImg,
    },
  },
  pumpkin: {
    name: "호박",
    seedCost: 30,
    sellPrice: 80,
    growthTime: 7, // 물 7번
    emoji: {
      planted: "🌱",
      growing: "🌿",
      ready: pumpkinImg,
    },
  },
};

// 기본 코드 템플릿
export const DEFAULT_CODE = `# 코드를 작성해보세요!
# 예시: plant(0, 0, "carrot")

`;
