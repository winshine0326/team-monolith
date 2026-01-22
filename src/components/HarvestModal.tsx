import { useGameState } from "@/hooks/useGameState";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function HarvestModal() {
  const { lastHarvestIncome, resetHarvestIncome } = useGameState();

  // lastHarvestIncome이 null이면 모달이 닫힌 상태
  const open = lastHarvestIncome !== null;

  const handleClose = () => {
    resetHarvestIncome();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => !isOpen && handleClose()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            🎉 수확 완료!
          </DialogTitle>
          <DialogDescription>
            성공적으로 농작물을 수확했습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="bg-yellow-100 p-4 rounded-full">
            <Coins className="w-12 h-12 text-yellow-600" />
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-yellow-600">
              +{lastHarvestIncome}G
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              골드를 획득했습니다!
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleClose}
            className="w-full sm:w-auto min-w-[100px]"
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
