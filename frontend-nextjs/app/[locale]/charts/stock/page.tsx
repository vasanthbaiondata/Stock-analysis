"use client";

import { StockChart } from "@app/ui";
import { StockItem } from "@app/api";

export default function StockPage() {
  const data: StockItem[] = [
    { date: "Mon", price: 120, volume: 200 },
    { date: "Tue", price: 132, volume: 300 },
    { date: "Wed", price: 101, volume: 150 },
    { date: "Thu", price: 134, volume: 400 },
    { date: "Fri", price: 90, volume: 250 }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-xl font-semibold mb-4">Stock Chart</h2>

      <StockChart
        data={data}
        showPrice={true}
        showVolume={true}
      />
    </div>
  );
}
