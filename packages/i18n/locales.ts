export const locales = ["en", "ta"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
