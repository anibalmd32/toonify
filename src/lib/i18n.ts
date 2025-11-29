import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";

export const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
} as const;

const i18nCookieName = "i18nextLng";
export const defaultNS = "translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: [
      "en",
      "es",
    ],
    fallbackLng: "es",
    debug: false,
    detection: {
      order: [
        "cookie",
      ],
      lookupCookie: i18nCookieName,
      caches: [
        "cookie",
      ],
      cookieMinutes: 60 * 24 * 365,
    },
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const setSSRLanguage = createIsomorphicFn().server(async () => {
  const language = getCookie(i18nCookieName);
  await i18n.changeLanguage(language || "es");
});

export { i18n as itn };
