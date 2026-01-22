import { useState } from "react";
import { useGameState } from "@/hooks/useGameState";
import { CROPS } from "@/lib/constants";
import type { CropType } from "@/types/game";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Coins } from "lucide-react";

export function Shop() {
  const { gold, seeds, buySeed } = useGameState();
  const [isOpen, setIsOpen] = useState(false);

  // 상점 토글
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg z-50"
        size="icon"
      >
        <ShoppingCart className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              🏪 씨앗 상점
            </CardTitle>
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-bold border border-yellow-300">
              <Coins className="h-5 w-5" />
              <span>{gold}G</span>
            </div>
          </div>
          <CardDescription>
            수확한 농산물을 팔아 모은 골드로 새로운 씨앗을 구매하세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(CROPS) as CropType[]).map((cropType) => {
            const crop = CROPS[cropType];
            const canAfford = gold >= crop.seedCost;

            return (
              <Card key={cropType} className="border-2 overflow-hidden">
                <div className="h-24 bg-slate-100 flex items-center justify-center p-2">
                  <img
                    src={crop.emoji.ready}
                    alt={crop.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <CardContent className="p-4 pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{crop.name}</h3>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      재고: {seeds[cropType]}개
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-slate-600 mb-4">
                    <div className="flex justify-between">
                      <span>씨앗 가격</span>
                      <span className="font-semibold">{crop.seedCost}G</span>
                    </div>
                    <div className="flex justify-between">
                      <span>판매 가격</span>
                      <span className="text-green-600 font-semibold">
                        {crop.sellPrice}G
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>성장 시간</span>
                      <span>물 {crop.growthTime}회</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="w-full"
                      disabled={!canAfford}
                      onClick={() => buySeed(cropType, 1)}
                    >
                      구매 ({crop.seedCost}G)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            닫기
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
