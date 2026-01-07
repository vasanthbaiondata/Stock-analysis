"use client";

type Props = {
  range: string;
  setRange: (r: string) => void;
  showPrice: boolean;
  setShowPrice: (v: boolean) => void;
  showVolume: boolean;
  setShowVolume: (v: boolean) => void;
};

const ranges = ["1M", "6M", "1Yr", "3Yr", "5Yr", "Max"];

export default function ChartToolbar({
  range,
  setRange,
  showPrice,
  setShowPrice,
  showVolume,
  setShowVolume,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Range buttons */}
      <div className="flex border rounded-md overflow-hidden">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-4 py-2 text-sm ${
              range === r
                ? "bg-indigo-100 text-indigo-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showPrice}
            onChange={(e) => setShowPrice(e.target.checked)}
          />
          Price
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={showVolume}
            onChange={(e) => setShowVolume(e.target.checked)}
          />
          Volume
        </label>
      </div>
    </div>
  );
}
