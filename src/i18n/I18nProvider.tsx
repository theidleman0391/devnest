import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations } from "./translations";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Spanish-speaking country codes
const SPANISH_COUNTRIES = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"
]);

function getBrowserLang(): Lang {
  const browserLang = navigator.language || (navigator as any).userLanguage || "";
  return browserLang.startsWith("es") ? "es" : "en";
}

function getSavedLang(): Lang | null {
  const saved = localStorage.getItem("lang") as Lang | null;
  return saved === "en" || saved === "es" ? saved : null;
}

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Use saved preference first, then browser language as instant default
  const [lang, setLangState] = useState<Lang>(() => getSavedLang() ?? getBrowserLang());

  useEffect(() => {
    // Only do IP geolocation if user has never manually chosen a language
    if (getSavedLang() !== null) return;

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryCode: string = data?.country_code ?? "";
        const geoLang: Lang = SPANISH_COUNTRIES.has(countryCode) ? "es" : "en";
        setLangState(geoLang);
      })
      .catch(() => {
        // Silently fall back to browser language already set
      });
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const t = (key: string) => translations[lang][key] || key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
