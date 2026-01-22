import { useGameState } from "@/hooks/useGameState";
import { Button } from "./ui/button";

export function GameHeader() {
  const { gold, seeds, reset } = useGameState();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">🌾 Code Farm</h1>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">💰 {gold}G</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="font-medium">씨앗:</span>{" "}
          <span>🥕 {seeds.carrot}</span>
          <span className="ml-2">🍅 {seeds.tomato}</span>
          <span className="ml-2">🎃 {seeds.pumpkin}</span>
        </div>
        <Button variant="outline" size="sm" onClick={reset}>
          🔄 리셋
        </Button>
      </div>
    </div>
  );
}
