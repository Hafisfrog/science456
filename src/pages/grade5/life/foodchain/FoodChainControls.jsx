const DEFAULT_LANGUAGE_LABELS = {
  th: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
  en: { th: "Thai", en: "English", ms: "Malay" },
  ms: { th: "Thai", en: "English", ms: "Melayu" },
};

const LANGUAGE_ORDER = ["th", "ms", "en"];
const LANGUAGE_SWITCHER_STYLES = {
  default: {
    wrapper:
      "inline-flex w-fit flex-wrap items-center gap-1 rounded-full bg-[#f5f7e8]/95 p-1 shadow-[0_8px_20px_rgba(92,122,55,0.12)] backdrop-blur-sm",
    button:
      "min-w-[4rem] rounded-full px-2.5 py-2 text-xs font-['Prompt',sans-serif] font-black transition sm:min-w-[5rem] sm:px-3.5 sm:py-2.5 sm:text-[1.15rem]",
    active: "bg-[#bcd2f1] text-[#31435c]",
    inactive: "bg-[#eef4fb] text-[#32455d] hover:bg-[#e5eef9]",
  },
  materials: {
    wrapper:
      "inline-flex w-fit items-center gap-[10px] rounded-[18px] border border-emerald-100/80 bg-white/82 px-3 py-[10px] shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-sm",
    button:
      "rounded-[14px] px-[18px] py-[10px] text-base font-['Prompt',sans-serif] font-black transition",
    active: "bg-[#bcd2f1] text-[#31435c]",
    inactive:
      "bg-[#eef4fb] text-[#32455d] hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(15,23,42,.14)]",
  },
};
const NAV_BUTTON_STYLES = {
  default: {
    wrapper: "flex flex-wrap items-center gap-2.5",
    back:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-['Prompt',sans-serif] font-black text-[#30445c] shadow-[0_8px_20px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:bg-[#fbfcf8] sm:px-6 sm:py-2.5 sm:text-[1.15rem]",
    next:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#08c95a] px-4 py-2 text-xs font-['Prompt',sans-serif] font-black text-white shadow-[0_10px_24px_rgba(8,201,90,0.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] sm:px-6 sm:py-2.5 sm:text-[1.15rem]",
  },
  materials: {
    wrapper: "flex items-center gap-3 max-[720px]:gap-2",
    back:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-white px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-[#30445c] shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]",
    next:
      "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[18px] bg-[#08c95a] px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-white shadow-[0_22px_46px_rgba(8,201,90,.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_28px_56px_rgba(8,201,90,.30)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]",
  },
};

export function FoodChainLanguageSwitcher({
  value = "th",
  onChange,
  labels,
  className = "",
  size = "default",
}) {
  const resolvedLabels = labels ?? DEFAULT_LANGUAGE_LABELS[value] ?? DEFAULT_LANGUAGE_LABELS.th;
  const styles = LANGUAGE_SWITCHER_STYLES[size] ?? LANGUAGE_SWITCHER_STYLES.default;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {LANGUAGE_ORDER.map((lang) => {
        const isActive = value === lang;

        return (
          <button
            key={lang}
            type="button"
            onClick={() => onChange?.(lang)}
            aria-pressed={isActive}
            className={`${styles.button} ${isActive ? styles.active : styles.inactive}`}
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
  nextArrow = "\u2192",
  className = "",
  size = "default",
}) {
  const styles = NAV_BUTTON_STYLES[size] ?? NAV_BUTTON_STYLES.default;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className={styles.back}
      >
        <span aria-hidden="true">{"\u00AB"}</span>
        <span>{backLabel}</span>
      </button>

      <button
        type="button"
        onClick={onNext}
        className={styles.next}
      >
        <span>{nextLabel}</span>
        <span aria-hidden="true">{nextArrow}</span>
      </button>
    </div>
  );
}
