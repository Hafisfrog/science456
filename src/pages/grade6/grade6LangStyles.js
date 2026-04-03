export const GRADE6_LANG_BAR_CLASS =
  "flex items-center gap-[10px] rounded-[18px] bg-white/90 p-[10px_12px] shadow-[0_10px_22px_rgba(0,0,0,.12)] max-[640px]:gap-2 max-[640px]:p-[10px]";

export function grade6LangButtonClass(isActive) {
  return `rounded-[14px] border-none px-[14px] py-[10px] text-base font-black text-slate-900 transition duration-150 hover:-translate-y-0.5 max-[640px]:px-3 max-[640px]:text-[15px] ${
    isActive
      ? "bg-sky-200"
      : "bg-[#e6f2ff]"
  }`;
}
