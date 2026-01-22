import { useGameState } from "@/hooks/useGameState";

export function GameHeader() {
  const { gold } = useGameState();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">🌾 Code Farm</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">💰 {gold}G</span>
        </div>
      </div>
    </div>
  );
}
