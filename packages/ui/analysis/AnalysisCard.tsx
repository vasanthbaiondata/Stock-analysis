"use client";

import { CheckCircle, XCircle } from "@app/icons";
import { useTranslations } from "next-intl";
import "@app/styles/analysis.css";

type Props = {
  pros: string[];
  cons: string[];
  disclaimer?: string;
};

export function AnalysisCard({ pros, cons, disclaimer }: Props) {
  const t = useTranslations("analysis");

  return (
    <section className="analysis-card">
      <div className="analysis-grid">
        <div className="analysis-pros">
          <h3>
            <CheckCircle size={16} /> {t("pros")}
          </h3>
          <ul>
            {pros.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-cons">
          <h3>
            <XCircle size={16} /> {t("cons")}
          </h3>
          <ul>
            {cons.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="analysis-disclaimer">
        {disclaimer || t("disclaimer")}
      </p>
    </section>
  );
}
