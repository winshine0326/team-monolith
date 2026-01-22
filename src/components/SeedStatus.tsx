import { useGameState } from "@/hooks/useGameState";
import { Card, CardContent } from "./ui/card";

export function SeedStatus() {
  const { seeds } = useGameState();

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <span className="font-medium">나의 씨앗:</span>
        <div className="flex gap-3 text-sm">
          <span>🥕 당근: {seeds.carrot}개</span>
          <span>🍅 토마토: {seeds.tomato}개</span>
          <span>🎃 호박: {seeds.pumpkin}개</span>
        </div>
      </CardContent>
    </Card>
  );
}
