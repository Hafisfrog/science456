const DEFAULT_LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

const LANGUAGE_ORDER = ["th", "en", "ms"];

function sanitizeNavLabel(label = "") {
  return label.replace(/[\p{Extended_Pictographic}◀▶←→»«]+/gu, "").trim();
}

export function LightLanguageSwitcher({
  value = "th",
  onChange,
  labels,
  className = "",
}) {
  const resolvedLabels = labels ?? DEFAULT_LANGUAGE_LABELS[value] ?? DEFAULT_LANGUAGE_LABELS.th;

  return (
    <div
      className={`inline-flex w-fit flex-wrap items-center gap-2 rounded-[26px] bg-white/92 p-2 shadow-[0_8px_18px_rgba(59,130,246,0.14)] backdrop-blur-sm ${className}`}
    >
      {LANGUAGE_ORDER.map((lang) => {
        const isActive = value === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => onChange?.(lang)}
            aria-pressed={isActive}
            className={`min-w-[4rem] rounded-[18px] px-3.5 py-2 text-[0.85rem] font-black text-slate-950 transition sm:min-w-[5rem] sm:px-4 sm:py-2.5 sm:text-[1.05rem] ${
              isActive
                ? "bg-[#bfe3ff]"
                : "bg-[#ebf4ff] hover:bg-[#deeeff]"
            }`}
          >
            {resolvedLabels[lang] ?? lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export function LightNavButtons({
  backLabel,
  nextLabel,
  onBack,
  onNext,
  className = "",
  size = "default",
}) {
  const resolvedBackLabel = sanitizeNavLabel(backLabel);
  const resolvedNextLabel = sanitizeNavLabel(nextLabel);
  const isLarge = size === "large";
  const wrapperClassName = isLarge ? "gap-3.5" : "gap-2.5";
  const backButtonClassName = isLarge
    ? "inline-flex items-center justify-center gap-2 rounded-full bg-[#4d5c75] px-7 py-3 text-base font-black text-white shadow-[0_10px_22px_rgba(71,85,105,0.24)] transition hover:-translate-y-0.5 hover:bg-[#43516a] sm:px-9 sm:py-4 sm:text-[1.35rem]"
    : "inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4d5c75] px-5 py-2 text-[0.85rem] font-black text-white shadow-[0_8px_18px_rgba(71,85,105,0.2)] transition hover:-translate-y-0.5 hover:bg-[#43516a] sm:px-6 sm:py-2.5 sm:text-[1.05rem]";
  const nextButtonClassName = isLarge
    ? "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#15b8e8] px-7 py-3 text-base font-black text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:brightness-105 sm:px-9 sm:py-4 sm:text-[1.35rem]"
    : "inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#15b8e8] px-5 py-2 text-[0.85rem] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5 hover:brightness-105 sm:px-6 sm:py-2.5 sm:text-[1.05rem]";

  return (
    <div className={`flex flex-wrap items-center ${wrapperClassName} ${className}`}>
      {onBack && resolvedBackLabel ? (
        <button
          type="button"
          onClick={onBack}
          className={backButtonClassName}
        >
          <span aria-hidden="true">◀</span>
          <span>{resolvedBackLabel}</span>
        </button>
      ) : null}

      {onNext && resolvedNextLabel ? (
        <button
          type="button"
          onClick={onNext}
          className={nextButtonClassName}
        >
          <span>{resolvedNextLabel}</span>
          <span aria-hidden="true">▶</span>
        </button>
      ) : null}
    </div>
  );
}
