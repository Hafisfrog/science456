const DEFAULT_LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

const LANGUAGE_ORDER = ["th", "en", "ms"];

export function FoodChainLanguageSwitcher({
  value = "th",
  onChange,
  labels,
  className = "",
}) {
  const resolvedLabels = labels ?? DEFAULT_LANGUAGE_LABELS[value] ?? DEFAULT_LANGUAGE_LABELS.th;

  return (
    <div
      className={`inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-[#f5f7e8]/95 p-1 shadow-[0_8px_20px_rgba(92,122,55,0.12)] backdrop-blur-sm ${className}`}
    >
      {LANGUAGE_ORDER.map((lang) => {
        const isActive = value === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => onChange?.(lang)}
            aria-pressed={isActive}
            className={`min-w-[4rem] rounded-full px-2.5 py-2 text-xs font-black transition sm:min-w-[5rem] sm:px-3.5 sm:py-2.5 sm:text-[1.15rem] ${
              isActive
                ? "bg-[#bcd2f1] text-[#31435c]"
                : "bg-[#eef4fb] text-[#32455d] hover:bg-[#e5eef9]"
            }`}
          >
            {resolvedLabels[lang] ?? lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function FoodChainNavButtons({
  backLabel,
  nextLabel,
  onBack,
  onNext,
  className = "",
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-black text-[#30445c] shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fbfcf8] sm:px-6 sm:py-2.5 sm:text-[1.15rem]"
      >
        <span aria-hidden="true">←</span>
        <span>{backLabel}</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#08c95a] px-4 py-2 text-xs font-black text-white shadow-[0_10px_24px_rgba(8,201,90,0.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] sm:px-6 sm:py-2.5 sm:text-[1.15rem]"
      >
        <span>{nextLabel}</span>
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
