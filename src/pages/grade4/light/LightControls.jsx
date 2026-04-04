const DEFAULT_LANGUAGE_LABELS = {
  th: {
    th: "\u0e44\u0e17\u0e22",
    en: "\u0e2d\u0e31\u0e07\u0e01\u0e24\u0e29",
    ms: "\u0e21\u0e25\u0e32\u0e22\u0e39",
  },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

const LANGUAGE_ORDER = ["th", "en", "ms"];

function sanitizeNavLabel(label = "") {
  return label
    .replace(/[\p{Extended_Pictographic}\u00ab\u00bb\u25c0\u25b6\u2190\u2192]+/gu, "")
    .trim();
}

export function LightLanguageSwitcher({
  value = "th",
  onChange,
  labels,
  className = "",
}) {
  const resolvedLabels =
    labels ?? DEFAULT_LANGUAGE_LABELS[value] ?? DEFAULT_LANGUAGE_LABELS.th;

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
              isActive ? "bg-[#bfe3ff]" : "bg-[#ebf4ff] hover:bg-[#deeeff]"
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
  const displayBackLabel = isLarge
    ? "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a"
    : resolvedBackLabel;
  const displayNextLabel = isLarge
    ? "\u0e44\u0e1b\u0e15\u0e48\u0e2d"
    : resolvedNextLabel;
  const wrapperClassName = isLarge ? "flex-nowrap gap-1.5 sm:gap-2" : "gap-2.5";
  const backButtonClassName = isLarge
    ? "inline-flex min-w-[98px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#505b73] px-3 py-1.5 text-[0.76rem] font-['Prompt',sans-serif] font-black tracking-normal text-white shadow-[0_8px_16px_rgba(51,65,85,0.17)] transition hover:-translate-y-0.5 hover:bg-[#475167] sm:min-h-[44px] sm:min-w-[166px] sm:px-5 sm:text-[0.84rem]"
    : "inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4d5c75] px-5 py-2 text-[0.85rem] font-black text-white shadow-[0_8px_18px_rgba(71,85,105,0.2)] transition hover:-translate-y-0.5 hover:bg-[#43516a] sm:px-6 sm:py-2.5 sm:text-[1.05rem]";
  const nextButtonClassName = isLarge
    ? "inline-flex min-w-[98px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#2d79ff] via-[#2f94f1] to-[#27bde9] px-3 py-1.5 text-[0.76rem] font-['Prompt',sans-serif] font-black tracking-normal text-white shadow-[0_8px_16px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[44px] sm:min-w-[166px] sm:px-5 sm:text-[0.84rem]"
    : "inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#15b8e8] px-5 py-2 text-[0.85rem] font-black text-white shadow-[0_8px_18px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5 hover:brightness-105 sm:px-6 sm:py-2.5 sm:text-[1.05rem]";
  const arrowClassName = isLarge ? "text-[0.88em] leading-none" : "";
  const backArrow = isLarge ? "\u25C0" : "\u00AB";
  const nextArrow = isLarge ? "\u25B6" : "\u00BB";

  return (
    <div className={`flex flex-wrap items-center ${wrapperClassName} ${className}`}>
      {onBack && displayBackLabel ? (
        <button type="button" onClick={onBack} className={backButtonClassName}>
          <span aria-hidden="true" className={arrowClassName}>
            {backArrow}
          </span>
          <span>{displayBackLabel}</span>
        </button>
      ) : null}

      {onNext && displayNextLabel ? (
        <button type="button" onClick={onNext} className={nextButtonClassName}>
          <span>{displayNextLabel}</span>
          <span aria-hidden="true" className={arrowClassName}>
            {nextArrow}
          </span>
        </button>
      ) : null}
    </div>
  );
}
