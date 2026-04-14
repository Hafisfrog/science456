const DEFAULT_LANGUAGE_LABELS = {
  th: {
    th: "\u0e44\u0e17\u0e22",
    en: "\u0e2d\u0e31\u0e07\u0e01\u0e24\u0e29",
    ms: "\u0e21\u0e25\u0e32\u0e22\u0e39",
  },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "Inggeris", ms: "Melayu" },
};

const LANGUAGE_ORDER = ["th", "ms", "en"];

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
      className={`inline-flex w-fit flex-wrap items-center gap-2.5 rounded-[22px] bg-white/95 px-3 py-2.5 shadow-[0_14px_28px_rgba(15,23,42,.14)] backdrop-blur-sm max-[720px]:gap-1.5 max-[720px]:rounded-[16px] max-[720px]:px-2 max-[720px]:py-2 ${className}`}
    >
      {LANGUAGE_ORDER.map((lang) => {
        const isActive = value === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => onChange?.(lang)}
            aria-pressed={isActive}
            className={`inline-flex h-[48px] min-w-[76px] items-center justify-center rounded-[16px] px-4 text-[18px] font-black text-slate-950 transition max-[720px]:h-[36px] max-[720px]:min-w-[54px] max-[720px]:rounded-[12px] max-[720px]:px-2.5 max-[720px]:text-[14px] ${
              isActive
                ? "bg-[#c7dff8]"
                : "bg-[#eef6ff] hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(15,23,42,.12)]"
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
    ? (resolvedBackLabel || "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a")
    : resolvedBackLabel;
  const displayNextLabel = isLarge
    ? (resolvedNextLabel || "\u0e44\u0e1b\u0e15\u0e48\u0e2d")
    : resolvedNextLabel;
  const wrapperClassName = isLarge ? "flex-nowrap gap-2 sm:gap-3" : "gap-3";
  const backButtonClassName = isLarge
    ? "inline-flex min-w-[98px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black tracking-normal text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
    : "inline-flex h-[62px] min-w-[128px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-white/96 px-5 text-[20px] font-['Prompt',sans-serif] font-black tracking-normal text-slate-950 shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(15,23,42,0.22)] active:translate-y-[1px] max-[720px]:h-[44px] max-[720px]:min-w-[104px] max-[720px]:gap-1 max-[720px]:rounded-[14px] max-[720px]:px-3 max-[720px]:text-[16px]";
  const nextButtonClassName = isLarge
    ? "inline-flex min-w-[98px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-[linear-gradient(135deg,#ef4444,#b91c1c)] px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black tracking-normal text-white shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
    : "inline-flex h-[62px] min-w-[128px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-[#c83d3a] px-5 text-[20px] font-['Prompt',sans-serif] font-black tracking-normal text-white shadow-[0_12px_24px_rgba(127,29,29,0.24)] transition hover:-translate-y-0.5 hover:bg-[#b93633] hover:shadow-[0_16px_32px_rgba(127,29,29,0.28)] active:translate-y-[1px] max-[720px]:h-[44px] max-[720px]:min-w-[104px] max-[720px]:gap-1 max-[720px]:rounded-[14px] max-[720px]:px-3 max-[720px]:text-[16px]";
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
