import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useGameState } from "@/hooks/useGameState";
import { MISSIONS } from "@/lib/missions";
import { useMemo } from "react";

export function MissionPanel() {
  const gameState = useGameState();

  // 현재 미션 찾기
  const currentMission = useMemo(() => {
    for (const mission of MISSIONS) {
      if (!mission.check(gameState)) {
        return mission;
      }
    }
    return null; // 모든 미션 완료
  }, [gameState]);

  if (!currentMission) {
    return (
      <Card className="bg-green-50 border-green-500">
        <CardHeader>
          <CardTitle className="text-green-700">🎉 모든 미션 완료!</CardTitle>
          <CardDescription>
            축하합니다! 모든 미션을 완료했습니다. 이제 자유롭게 코딩해보세요!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded">
            미션 {currentMission.id}
          </span>
          {currentMission.title}
        </CardTitle>
        <CardDescription>{currentMission.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm">
          <span className="font-medium">💡 힌트:</span> {currentMission.hint}
        </div>
        {currentMission.exampleCode && (
          <div className="bg-muted p-3 rounded-md">
            <div className="text-xs text-muted-foreground mb-1">예제 코드:</div>
            <pre className="text-sm font-mono">{currentMission.exampleCode}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
