export async function getAnalysis() {
  const res = await fetch("http://localhost:1337/api/analysis", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analysis");
  }

  const json = await res.json();
  return json.data;
}
