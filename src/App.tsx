import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameHeader } from "./components/GameHeader";
import { FarmGrid } from "./components/FarmGrid";
import { CodeEditor } from "./components/CodeEditor";
import { ExecuteButton } from "./components/ExecuteButton";
import { MissionPanel } from "./components/MissionPanel";
import { useGameState } from "./hooks/useGameState";
import { useCodeExecution } from "./hooks/useCodeExecution";
import { DEFAULT_CODE } from "./lib/constants";
import { checkApiKey } from "./lib/openai";
import { Card, CardContent } from "./components/ui/card";

const queryClient = new QueryClient();

function GameApp() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const gameState = useGameState();
  const { mutate: executeCode, isPending, data } = useCodeExecution();

  // API 키 체크
  const hasApiKey = checkApiKey();

  const handleExecute = () => {
    if (!hasApiKey) {
      alert("OpenAI API 키를 .env 파일에 설정해주세요!\nVITE_OPENAI_API_KEY=your_key_here");
      return;
    }

    executeCode(
      { code, gameState },
      {
        onSuccess: (result) => {
          if (result.success) {
            gameState.executeActions(result.actions);
            if (result.message) {
              console.log("✅", result.message);
            }
          } else {
            alert(`❌ 에러: ${result.error}`);
          }
        },
        onError: (error) => {
          alert(`❌ 실행 오류: ${error.message}`);
        },
      }
    );
  };

  const handleCodeReset = () => {
    setCode(DEFAULT_CODE);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {/* 왼쪽: 농장 */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <FarmGrid grid={gameState.grid} />
            </CardContent>
          </Card>

          <MissionPanel />
        </div>

        {/* 오른쪽: 코드 에디터 */}
        <div className="flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardContent className="flex-1 p-4 flex flex-col min-h-[500px]">
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                파이썬 코드 에디터
              </div>
              <div className="flex-1">
                <CodeEditor value={code} onChange={setCode} />
              </div>
            </CardContent>
          </Card>

          <ExecuteButton
            onExecute={handleExecute}
            onReset={handleCodeReset}
            isLoading={isPending}
          />

          {/* 결과 메시지 */}
          {data && (
            <Card className={data.success ? "bg-green-50" : "bg-red-50"}>
              <CardContent className="p-4">
                <div className="text-sm">
                  {data.success ? (
                    <>
                      <div className="font-medium text-green-700">✅ 실행 성공!</div>
                      {data.message && (
                        <div className="text-green-600 mt-1">{data.message}</div>
                      )}
                      {data.actions.length > 0 && (
                        <div className="text-xs text-green-600 mt-1">
                          {data.actions.length}개 액션 실행됨
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-medium text-red-700">❌ 에러</div>
                      <div className="text-red-600 mt-1">{data.error}</div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameApp />
    </QueryClientProvider>
  );
}

export default App;
