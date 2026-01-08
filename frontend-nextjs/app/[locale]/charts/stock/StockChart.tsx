"use client";

import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export default function StockChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      title: {
        text: "Stock Price"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "Price",
          type: "line",
          data: [120, 132, 101, 134, 90]
        }
      ]
    });

    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: 400 }} />;
}
