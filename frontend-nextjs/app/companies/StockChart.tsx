"use client";

import * as echarts from "echarts";
import { useEffect, useRef } from "react";

type DataPoint = {
  date: string;
  price: number;
  volume?: number;
};

export default function StockChart({
  data,
  showPrice,
  showVolume,
}: {
  data: DataPoint[];
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

      xAxis: [
        {
          type: "category",
          data: data.map((d) => d.date),
        },
      ],

      yAxis: [
        {
          type: "value",
          scale: true,
          name: "Price",
        },
        {
          type: "value",
          scale: true,
          name: "Volume",
          show: showVolume,
        },
      ],

      dataZoom: [
        { type: "inside" },
        { type: "slider", bottom: 0 },
      ],

      series: [
        showPrice && {
          name: "Price",
          type: "line",
          smooth: true,
          showSymbol: false,
          data: data.map((d) => d.price),
          lineStyle: { width: 2 },
        },

        showVolume && {
          name: "Volume",
          type: "bar",
          yAxisIndex: 1,
          data: data.map((d) => d.volume ?? 0),
          itemStyle: { color: "rgba(37,99,235,0.3)" },
        },
      ].filter(Boolean),
    });

    return () => chart.dispose();
  }, [data, showPrice, showVolume]);

  return <div ref={ref} style={{ height: 450 }} />;
}
