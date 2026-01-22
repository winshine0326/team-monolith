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

    const { error } = await supabase.from("game_saves").upsert({
      user_id: userId,
      data: saveData,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("데이터 저장 실패:", error);
      throw error;
    }

    return true;
  },

  // 게임 데이터 불러오기
  loadGame: async (userId: string) => {
    const { data, error } = await supabase
      .from("game_saves")
      .select("data")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("데이터 불러오기 실패:", error);
        throw error;
      }
      return null;
    }

    return data?.data || null;
  },
};
