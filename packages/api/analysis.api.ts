export type AnalysisData = {
  pros: string[];
  cons: string[];
  disclaimer?: string;
};

export async function getAnalysis(): Promise<AnalysisData> {
  const res = await fetch(
    "http://localhost:1337/api/analysis",
    { cache: "no-store" }
  );

  const json = await res.json();

  return {
    pros: json.data.pros,
    cons: json.data.cons,
    disclaimer: json.data.disclaimer
  };
}
