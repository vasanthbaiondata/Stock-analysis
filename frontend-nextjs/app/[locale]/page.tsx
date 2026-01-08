import Link from "next/link";
import { getCompanies } from "@app/api";

export default async function HomePage() {
  const companies = await getCompanies();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Companies
      </h2>

      {companies.length === 0 && (
        <p className="text-gray-500">
          No companies available
        </p>
      )}

      <ul className="space-y-2">
        {companies.map((company) => (
          <li key={company.slug}>
            <Link
              href={`/en/companies/${company.slug}`}
              className="text-blue-600 underline"
            >
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
