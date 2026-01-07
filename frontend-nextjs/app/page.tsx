import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Companies
      </h2>

      <ul className="space-y-2">
        <li>
          <Link
            href="/companies/hdfc-bank"
            className="text-blue-600 underline"
          >
            HDFC Bank
          </Link>
        </li>
      </ul>
    </div>
  );
}
