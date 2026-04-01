const BUTTONS = [
  {
    key: "th",
    textProp: "th",
    className:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-blue-50 disabled:text-blue-300",
  },
  {
    key: "en",
    textProp: "en",
    className:
      "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-300",
  },
  {
    key: "ms",
    textProp: "ms",
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-200 disabled:bg-amber-50 disabled:text-amber-300",
  },
];

const LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

export default function SpeakButton({
  th,
  en,
  ms,
  activeLang = "th",
  onLanguageChange,
  variant = "default",
}) {
  const textByLang = { th, en, ms };
  const labels = LABELS[activeLang] ?? LABELS.th;
  const isSegmented = variant === "segmented";

  const handleClick = (button) => {
    onLanguageChange?.(button.key);
  };

  return (
    <div
      className={
        isSegmented
          ? "inline-flex flex-wrap items-center gap-2 rounded-[28px] border border-[#bfd3e3] bg-[linear-gradient(180deg,rgba(237,242,248,0.95),rgba(209,221,233,0.92))] p-2 shadow-[0_8px_18px_rgba(122,146,167,0.14)]"
          : "mt-3 flex flex-wrap gap-2"
      }
    >
      {BUTTONS.map((button) => {
        const text = textByLang[button.textProp];
        const isActive = activeLang === button.key;
        const buttonClass = isSegmented
          ? `rounded-full px-6 py-2 text-sm font-semibold transition-colors sm:px-7 sm:py-2.5 sm:text-base ${
              isActive
                ? "bg-[#d1e3f0] text-[#1d4b6e]"
                : "bg-[#c3d1de] text-[#4c6278] hover:bg-[#b7c6d4]"
            } ${!text ? "cursor-not-allowed opacity-50" : ""}`
          : `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${button.className} ${
              isActive ? "ring-2 ring-offset-2 ring-slate-500" : ""
            }`;

        return (
          <button
            key={button.key}
            type="button"
            onClick={() => handleClick(button)}
            disabled={!text}
            aria-pressed={isActive}
            className={buttonClass}
          >
            {labels[button.key] ?? button.key.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
