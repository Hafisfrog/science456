export const GRADE6_LANG_BAR_CLASS =
  "flex items-center gap-2 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_24px_rgba(0,0,0,.14)]";

export function grade6LangButtonClass(isActive) {
  return `rounded-[14px] border-none px-[18px] py-[10px] text-base font-extrabold text-slate-900 transition ${
    isActive
      ? "bg-[#bfe0ff] text-slate-900"
      : "bg-[#e6f2ff] text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_14px_22px_rgba(0,0,0,.14)]"
  }`;
}
