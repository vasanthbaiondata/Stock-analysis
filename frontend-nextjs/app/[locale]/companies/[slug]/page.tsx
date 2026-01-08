"use client";

import { useEffect, useState } from "react";
import { getStockHistory, getAnalysis } from "@app/api";
import { StockChart, ChartToolbar } from "@app/ui";

/* ---------------- TYPES (PAGE-LEVEL) ---------------- */

/**
 * UI-facing chart data
 * (Mapped from API response)
 */
type ChartPoint = {
  date: string;
  price: number;
  volume?: number;
};

type AnalysisData = {
  pros: string[];
  cons: string[];
  disclaimer?: string;
};

/* ---------------- HELPERS ---------------- */

function filterByRange(data: ChartPoint[], range: string) {
  if (range === "Max") return data;

  const map: Record<string, number> = {
    "1M": 30,
    "6M": 180,
    "1Yr": 365,
    "3Yr": 1095,
    "5Yr": 1825
  };

  return data.slice(-map[range]);
}

/* ---------------- PAGE ---------------- */

export default function CompanyPage() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const [range, setRange] = useState("1Yr");
  const [showPrice, setShowPrice] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  /* -------- FETCH DATA -------- */

  useEffect(() => {
    // Stock data
    getStockHistory().then((apiData) => {
      const chartData: ChartPoint[] = apiData.map((item) => ({
        date: item.date,
        price: item.price,
        volume: item.volume
      }));

      setData(chartData);
    });

    // Analysis data
    getAnalysis().then(setAnalysis);
  }, []);

  const filtered = filterByRange(data, range);

  return (
    <div className="space-y-6">
      {/* -------- STOCK CHART -------- */}
      <div className="p-6 bg-white rounded-xl shadow space-y-4">
        <ChartToolbar
          range={range}
          setRange={setRange}
          showPrice={showPrice}
          setShowPrice={setShowPrice}
          showVolume={showVolume}
          setShowVolume={setShowVolume}
        />

        <StockChart
          data={filtered}
          showPrice={showPrice}
          showVolume={showVolume}
        />
      </div>

      {/* -------- ANALYSIS SECTION -------- */}
      {analysis && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PROS */}
            <div className="border border-red-300 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-3">
                PROS
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {analysis.pros.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* CONS */}
            <div className="border border-red-300 rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-3">
                CONS
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                {analysis.cons.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.disclaimer && (
            <p className="text-xs text-gray-500 mt-4">
              * {analysis.disclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
