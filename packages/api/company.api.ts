import axios from "axios";

const API_URL = "http://localhost:1337/api";

export type Company = {
  name: string;
  slug: string;
};

export async function getCompanies(): Promise<Company[]> {
  const res = await axios.get(`${API_URL}/companies`);

  return res.data.data
    .map((c: any) => {
      const source = c.attributes ?? c; // 🔑 KEY FIX

      if (!source?.name || !source?.slug) return null;

      return {
        name: source.name,
        slug: source.slug
      };
    })
    .filter(Boolean); // remove nulls
}
