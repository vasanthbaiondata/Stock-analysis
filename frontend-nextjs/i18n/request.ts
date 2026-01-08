import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "@app/i18n";

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale =
    locale && locales.includes(locale as any)
      ? locale
      : defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`@app/i18n/${resolvedLocale}.json`)).default
  };
});
