import { Button } from "./ui/button";

interface ExecuteButtonProps {
  onExecute: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export function ExecuteButton({ onExecute, onReset, isLoading }: ExecuteButtonProps) {
  return (
    <div className="flex gap-2 p-4 border-t">
      <Button
        onClick={onExecute}
        disabled={isLoading}
        className="flex-1"
        size="lg"
      >
        {isLoading ? "⏳ 실행 중..." : "▶️ 실행"}
      </Button>
      <Button
        onClick={onReset}
        disabled={isLoading}
        variant="outline"
        size="lg"
      >
        🔄 코드 리셋
      </Button>
    </div>
  );
}
