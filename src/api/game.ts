import { supabase } from "@/lib/supabase";
import type { GameState } from "@/types/game";

export const gameApi = {
  // 게임 데이터 저장
  saveGame: async (userId: string, state: GameState) => {
    const saveData = {
      grid: state.grid,
      gold: state.gold,
      seeds: state.seeds,
      day: state.day,
    };

    console.log(`[GameApi] Saving data for ${userId}...`, saveData);

    const { error } = await supabase.from("game_saves").upsert({
      user_id: userId,
      data: saveData,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error(
        "[GameApi] Save failed:",
        error.message,
        error.details,
        error.hint,
      );
      throw error;
    }

    console.log("[GameApi] Save successful!");
    return true;
  },

  // 게임 데이터 불러오기
  loadGame: async (userId: string) => {
    // maybeSingle()을 사용하면 데이터가 0개일 때 에러 대신 null을 반환합니다.
    const { data, error } = await supabase
      .from("game_saves")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("[GameApi] Load failed:", error.message);
      throw error;
    }

    return data?.data || null;
  },
};
