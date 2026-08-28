import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_TRANSLATIONS } from "../data/initialData";
const LanguageContext = createContext(void 0);
export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("/ro")) return "ro";
      if (hash.includes("/hu")) return "hu";
      if (hash.includes("/en")) return "en";
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang");
      if (langParam && ["en", "ro", "hu"].includes(langParam)) {
        return langParam;
      }
    }
    return "en";
  });
  const [direction, setDirection] = useState("ltr");
  const [translations, setTranslations] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jb_photography_translations");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse translations", e);
        }
      }
    }
    return DEFAULT_TRANSLATIONS;
  });
  useEffect(() => {
    localStorage.setItem("jb_photography_translations", JSON.stringify(translations));
  }, [translations]);
  const setLanguage = (lang) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.pushState({}, "", url.toString());
      window.location.hash = `#/${lang}`;
    }
  };
  useEffect(() => {
    document.documentElement.dir = direction;
    const siteTitle = translations[language]?.site_title || "Jozsa-Bara Szende Photography";
    document.title = siteTitle;
  }, [language, direction, translations]);
  const t = (key, fallback) => {
    const langDict = translations[language] || translations["en"] || {};
    if (langDict[key]) return langDict[key];
    const enDict = translations["en"] || {};
    if (enDict[key]) return enDict[key];
    return fallback || key;
  };
  const updateTranslationKey = (lang, key, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang] || {},
        [key]: value
      }
    }));
  };
  const addTranslationKey = (key, enVal, roVal, huVal) => {
    setTranslations((prev) => ({
      ...prev,
      en: { ...prev.en || {}, [key]: enVal },
      ro: { ...prev.ro || {}, [key]: roVal },
      hu: { ...prev.hu || {}, [key]: huVal }
    }));
  };
  const resetTranslations = () => {
    setTranslations(DEFAULT_TRANSLATIONS);
    localStorage.removeItem("jb_photography_translations");
  };
  return <LanguageContext.Provider
    value={{
      language,
      direction,
      translations,
      setLanguage,
      setDirection,
      t,
      updateTranslationKey,
      addTranslationKey,
      resetTranslations
    }}
  >
      <div dir={direction} className={direction === "rtl" ? "font-rtl" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>;
};
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
