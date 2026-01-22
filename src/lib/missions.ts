import type { GameState } from "@/types/game";

export interface Mission {
  id: number;
  title: string;
  description: string;
  hint: string;
  exampleCode?: string;
  check: (state: GameState) => boolean;
}

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "첫 번째 작물 심기",
    description: "plant(0, 0, 'carrot')을 입력해서 당근을 심어보세요!",
    hint: "plant(x, y, crop) 함수는 (x, y) 위치에 작물을 심어요",
    exampleCode: `plant(0, 0, "carrot")`,
    check: (state) => state.grid[0][0].state === "planted",
  },
  {
    id: 2,
    title: "물 주기",
    description: "water(0, 0)으로 방금 심은 당근에 물을 주세요!",
    hint: "물을 주면 작물이 자라요. 여러 번 주면 수확 가능해져요!",
    exampleCode: `water(0, 0)`,
    check: (state) => state.grid[0][0].growthProgress > 0,
  },
  {
    id: 3,
    title: "반복문 배우기 - for문",
    description: "for문으로 첫 번째 줄 전체에 당근을 심어보세요!",
    hint: "for x in range(4): 는 x를 0부터 3까지 반복해요",
    exampleCode: `for x in range(4):
    plant(x, 0, "carrot")`,
    check: (state) =>
      state.grid[0].every((tile) => tile.state !== "empty" && tile.crop === "carrot"),
  },
  {
    id: 4,
    title: "작물 수확하기",
    description: "충분히 자란 작물을 수확해보세요!",
    hint: "harvest(x, y)로 수확할 수 있어요. 먼저 물을 충분히 줘야 해요!",
    exampleCode: `# 먼저 작물을 충분히 키우고
water(0, 0)
water(0, 0)
water(0, 0)
# 그 다음 수확!
harvest(0, 0)`,
    check: (state) => state.gold > 100, // 초기 100G보다 많으면 수확 성공
  },
];
