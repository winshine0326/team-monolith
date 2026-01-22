import { useEffect, useRef } from "react";
import { useGameState } from "./useGameState";
import { authApi } from "@/api/auth";

export function useAutoSave() {
  const saveGame = useGameState((state) => state.saveGame);
  const state = useGameState(); // 전체 상태 구독 (최적화 필요할 수 있음)

  // 저장에 필요한 데이터만 선택
  const dataToSave = {
    grid: state.grid,
    gold: state.gold,
    seeds: state.seeds,
    day: state.day,
  };

  const userRef = useRef<string | null>(null);

  useEffect(() => {
    // 유저 ID 가져오기
    authApi.getSession().then(({ session }) => {
      userRef.current = session?.user?.id ?? null;
    });

    const subscription = authApi.onAuthStateChange((session) => {
      userRef.current = session?.user?.id ?? null;
    });

    return () => subscription.unsubscribe();
  }, []);

  // Debounced Auto Save
  useEffect(() => {
    const handler = setTimeout(() => {
      if (userRef.current && state.isLoaded) {
        console.log("Auto-saving game...");
        saveGame(userRef.current);
      }
    }, 2000); // 2초 동안 변경이 없으면 저장

    return () => {
      clearTimeout(handler);
    };
  }, [
    dataToSave.grid,
    dataToSave.gold,
    dataToSave.seeds,
    dataToSave.day,
    saveGame,
  ]);
}
