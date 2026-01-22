import type { Tile } from "@/types/game";
import { FarmTile } from "./FarmTile";

interface FarmGridProps {
  grid: Tile[][];
}

export function FarmGrid({ grid }: FarmGridProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, y) =>
          row.map((tile, x) => <FarmTile key={`${x}-${y}`} tile={tile} />)
        )}
      </div>
    </div>
  );
}
