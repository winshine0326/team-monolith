import { useMutation } from "@tanstack/react-query";
import { executeCode } from "@/lib/interpreter";
import type { GameState } from "@/types/game";

export function useCodeExecution() {
  return useMutation({
    mutationFn: async ({
      code,
      gameState,
    }: {
      code: string;
      gameState: GameState;
    }) => {
      return await executeCode(code, gameState);
    },
  });
}
