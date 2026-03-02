import { useEffect, useState } from "react";

const STORAGE_KEY = "p5_genetics_lang";
const FALLBACK_LANG = "th";
const VALID_LANGS = new Set(["th", "en", "ms"]);

export function useP5GeneticsLang() {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return FALLBACK_LANG;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return VALID_LANGS.has(saved) ? saved : FALLBACK_LANG;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return { lang, setLang };
}

export const LANG_BUTTON_TEXT = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "English", ms: "Melayu" },
};

export const NEXT_LABEL = {
  th: "ต่อไป >>",
  en: "Next >>",
  ms: "Seterusnya >>",
};
