import type { Tile } from "@/types/game";
import { CROPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FarmTileProps {
  tile: Tile;
}

export function FarmTile({ tile }: FarmTileProps) {
  // 타일 상태에 따른 컨텐츠 렌더링
  const renderContent = () => {
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
      return (
        <img
          src={cropInfo.emoji.ready}
          alt={cropInfo.name}
          className="w-4/5 h-4/5 object-contain animate-bounce"
        />
      );
    }

    return "🟫";
  };

  return (
    <div
      className={cn(
        "aspect-square flex items-center justify-center text-5xl overflow-hidden",
        "border-2 border-border rounded-lg bg-card",
        "transition-all hover:scale-105",
        "shadow-sm hover:shadow-md",
        tile.state === "ready" && "ring-2 ring-green-500 bg-green-50",
      )}
    >
      {renderContent()}
    </div>
  );
}
