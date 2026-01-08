"use client";

import type * as ECharts from "echarts";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";


/**
 * UI-level data shape
 * (DO NOT import from @app/api)
 */
export type ChartPoint = {
  date: string;
  price: number;
  volume?: number;
};

export function StockChart({
  data,
  showPrice,
  showVolume
}: {
  data: ChartPoint[];
  showPrice: boolean;
  showVolume: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = echarts.init(ref.current);

    chart.setOption({
      tooltip: { trigger: "axis" },
      grid: { left: "5%", right: "5%", bottom: "15%" },

      xAxis: {
        type: "category",
        data: data.map((d) => d.date)
      },

      yAxis: [
        { type: "value", name: "Price", scale: true },
        { type: "value", name: "Volume", scale: true, show: showVolume }
      ],

      dataZoom: [{ type: "inside" }, { type: "slider", bottom: 0 }],

      series: [
        showPrice && {
          name: "Price",
          type: "line",
          smooth: true,
          data: data.map((d) => d.price)
        },
        showVolume && {
          name: "Volume",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((d) => d.volume ?? 0)
        }
      ].filter(Boolean)
    });

    return () => chart.dispose();
  }, [data, showPrice, showVolume]);

  return <div ref={ref} style={{ height: 450 }} />;
}
