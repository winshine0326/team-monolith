import type { Tile } from "@/types/game";
import { CROPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FarmTileProps {
  tile: Tile;
}

export function FarmTile({ tile }: FarmTileProps) {
  // 타일 상태에 따른 이모지 결정
  const getEmoji = () => {
    if (tile.state === "empty") {
      return "🟫";
    }

    if (!tile.crop) return "🟫";

    const cropInfo = CROPS[tile.crop];

    if (tile.state === "planted") {
      return cropInfo.emoji.planted;
    }

    if (tile.state === "growing") {
      return cropInfo.emoji.growing;
    }

    if (tile.state === "ready") {
      return cropInfo.emoji.ready;
    }

    return "🟫";
  };

  return (
    <div
      className={cn(
        "aspect-square flex items-center justify-center text-5xl",
        "border-2 border-border rounded-lg bg-card",
        "transition-all hover:scale-105",
        "shadow-sm hover:shadow-md",
        tile.state === "ready" && "ring-2 ring-green-500 animate-pulse bg-green-50"
      )}
    >
      {getEmoji()}
    </div>
  );
}
