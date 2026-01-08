export type StockItem = {
  date: string;
  price: number;
  volume?: number;
};

export async function getStockHistory(): Promise<StockItem[]> {
  const res = await fetch(
    "http://127.0.0.1:1337/api/stock-price-histories?pagination[pageSize]=500&sort=date:asc",
    { cache: "no-store" }
  );

  const json = await res.json();

  return json.data.map((i: any) => ({
    date: i.date,
    price: Number(i.price),
    volume: i.volume ?? Math.floor(Math.random() * 500000)
  }));
}
