import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const MATERIAL_NAMES = {
  "/images/materials/l1.png": { th: "กระจกใส", en: "Clear Glass", ms: "Kaca Jernih" },
  "/images/materials/l10.png": { th: "แก้วใส", en: "Clear Cup", ms: "Gelas Jernih" },
  "/images/materials/l3.png": { th: "พลาสติกใส", en: "Clear Plastic", ms: "Plastik Jernih" },
  "/images/materials/l8.png": { th: "หมอก", en: "Fog", ms: "Kabus" },
  "/images/materials/l4.png": { th: "กระดาษไข", en: "Wax Paper", ms: "Kertas Surih" },
  "/images/materials/l2.png": { th: "กระจกฝ้า", en: "Frosted Glass", ms: "Kaca Kabur" },
  "/images/materials/l5.png": { th: "แผ่นไม้", en: "Wooden Board", ms: "Papan Kayu" },
  "/images/materials/l7.webp": { th: "ผนังปูน", en: "Cement Wall", ms: "Dinding Simen" },
  "/images/materials/l6.png": { th: "เหล็ก", en: "Steel", ms: "Besi" },
};

const TYPE_ICON = {
  transparent: "🔆",
  translucent: "🌫️",
  opaque: "⬛",
};

const RESULT_TEXT = {
  th: {
    transparent: "เห็นชัดเจน",
    translucent: "เห็นไม่ชัด",
    opaque: "มองไม่เห็น",
  },
  en: {
    transparent: "Clearly visible",
    translucent: "Not clearly visible",
    opaque: "Not visible",
  },
  ms: {
    transparent: "Nampak jelas",
    translucent: "Kurang jelas",
    opaque: "Tidak nampak",
  },
};

const UI = {
  th: {
    header: "📘 สรุปความรู้เรื่อง ตัวกลางของแสง",
    subHeader: (count) => `จากการทดลองทั้งหมด ${count} ครั้ง`,
    knowledgeTitle: "💡 ความรู้ที่ได้จากการทดลอง",
    knowledgeItems: [
      "• วัตถุโปร่งใส แสงผ่านได้ทั้งหมด มองเห็นชัด",
      "• วัตถุโปร่งแสง แสงผ่านบางส่วน มองเห็นไม่ชัด",
      "• วัตถุทึบแสง แสงผ่านไม่ได้",
    ],
    resultsTitle: "📊 รายการผลการทดลอง",
    noResults: "ยังไม่มีผลการทดลอง",
    speakLabel: "🔊 ฟังสรุปผล (ไทย / English / Malay)",
    back: "◀ กลับ",
    next: "ทำแบบทดสอบ ▶",
  },
  en: {
    header: "📘 Knowledge Summary: Medium of Light",
    subHeader: (count) => `From ${count} experiment records`,
    knowledgeTitle: "💡 Key Learnings",
    knowledgeItems: [
      "• Transparent objects allow all light to pass, so objects are clearly visible.",
      "• Translucent objects allow some light to pass, so objects are unclear.",
      "• Opaque objects do not allow light to pass.",
    ],
    resultsTitle: "📊 Experiment Results",
    noResults: "No experiment results yet",
    speakLabel: "🔊 Listen to summary (Thai / English / Malay)",
    back: "◀ Back",
    next: "Take Quiz ▶",
  },
  ms: {
    header: "📘 Ringkasan Pengetahuan: Medium Cahaya",
    subHeader: (count) => `Daripada ${count} rekod eksperimen`,
    knowledgeTitle: "💡 Pengetahuan Utama",
    knowledgeItems: [
      "• Objek lutsinar membenarkan semua cahaya melalui, jadi objek nampak jelas.",
      "• Objek lut separa membenarkan sebahagian cahaya melalui, jadi objek kurang jelas.",
      "• Objek legap tidak membenarkan cahaya melalui.",
    ],
    resultsTitle: "📊 Keputusan Eksperimen",
    noResults: "Belum ada keputusan eksperimen",
    speakLabel: "🔊 Dengar ringkasan (Thai / English / Malay)",
    back: "◀ Kembali",
    next: "Jawab Kuiz ▶",
  },
};

export default function P4LightSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [language, setLanguage] = useState("th");

  const allResults = useMemo(() => state?.allResults ?? [], [state]);
  const ui = UI[language] ?? UI.th;

  const counts = useMemo(
    () => ({
      transparent: allResults.filter((r) => (r.material?.type || r.type) === "transparent").length,
      translucent: allResults.filter((r) => (r.material?.type || r.type) === "translucent").length,
      opaque: allResults.filter((r) => (r.material?.type || r.type) === "opaque").length,
    }),
    [allResults]
  );

  const speakTexts = useMemo(
    () => ({
      th: `สรุปบทเรียนเรื่องตัวกลางของแสง จากการทดลองทั้งหมด ${allResults.length} ครั้ง โปร่งใส ${counts.transparent} ครั้ง โปร่งแสง ${counts.translucent} ครั้ง และทึบแสง ${counts.opaque} ครั้ง`,
      en: `Summary of medium of light lesson from ${allResults.length} experiments. Transparent ${counts.transparent}, translucent ${counts.translucent}, and opaque ${counts.opaque}.`,
      ms: `Ringkasan pembelajaran medium cahaya daripada ${allResults.length} eksperimen. Lutsinar ${counts.transparent}, lut separa ${counts.translucent}, dan legap ${counts.opaque}.`,
    }),
    [allResults.length, counts]
  );

  useEffect(() => {
    if (!allResults.length) {
      navigate("/p4/light/experiment");
    }
  }, [allResults.length, navigate]);

  const getMaterialName = (item) => {
    const img = item.material?.img;
    if (img && MATERIAL_NAMES[img]?.[language]) return MATERIAL_NAMES[img][language];

    const itemName = item.material?.name;
    if (typeof itemName === "string") return itemName;
    if (itemName && typeof itemName === "object") return itemName[language] || itemName.th || itemName.en;

    return "-";
  };

  const getResultText = (type) => {
    const textMap = RESULT_TEXT[language] ?? RESULT_TEXT.th;
    return textMap[type] ?? textMap.opaque;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-800 sm:text-3xl">{ui.header}</h1>
          <p className="mt-1 text-blue-600">{ui.subHeader(allResults.length)}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-blue-800">{ui.knowledgeTitle}</h2>
          <ul className="space-y-2 text-gray-700">
            {ui.knowledgeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-blue-800">{ui.resultsTitle}</h2>

          {allResults.length === 0 ? (
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-600">{ui.noResults}</div>
          ) : (
            <div className="space-y-3">
              {allResults.map((item, idx) => {
                const type = item.material?.type || item.type || "opaque";
                return (
                  <div key={`${idx}-${item.id ?? "row"}`} className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-3">
                    <img src={item.material?.img} alt="" className="h-12 w-12 object-contain" />

                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{getMaterialName(item)}</div>
                      <div className="text-sm text-gray-600">
                        {TYPE_ICON[type]} {getResultText(type)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-xl border-2 border-blue-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-blue-700">{ui.speakLabel}</p>
          <SpeakButton th={speakTexts.th} en={speakTexts.en} ms={speakTexts.ms} activeLang={language} onLanguageChange={setLanguage} />
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={() => navigate("/p4/light/record", { state: { pendingResults: allResults } })}
            className="rounded-xl bg-gray-500 px-6 py-3 text-white transition hover:bg-gray-600"
          >
            {ui.back}
          </button>

          <button
            onClick={() => navigate("/p4/light/qa")}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-white transition hover:shadow-lg"
          >
            {ui.next}
          </button>
        </div>
      </div>
    </div>
  );
}
