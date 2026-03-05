import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
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

const UI = {
  th: {
    title: "📋 บันทึกผลการทดลองที่ 4",
    subtitle: (count) => `เรื่อง ตัวกลางของแสง • ทดลองทั้งหมด ${count} ครั้ง`,
    tableTitle: "ผลการทดลอง",
    objectName: "ชื่อวัตถุ",
    lightPass: "แสงที่ผ่านวัตถุ",
    classifyAs: "จำแนกวัตถุเป็น",
    passGood: "ผ่านได้ดี",
    passSome: "ผ่านได้บ้าง",
    passNone: "ผ่านไม่ได้",
    transparent: "วัตถุโปร่งใส",
    translucent: "วัตถุโปร่งแสง",
    opaque: "วัตถุทึบแสง",
    summaryTitle: "📌 สรุปผลการทดลอง",
    summaryItems: [
      "• วัตถุโปร่งใส แสงผ่านได้ดี มองเห็นได้ชัดเจน",
      "• วัตถุโปร่งแสง แสงผ่านได้บางส่วน มองเห็นไม่ชัด",
      "• วัตถุทึบแสง แสงผ่านไม่ได้ มองไม่เห็น",
    ],
    speakLabel: "🔊 ฟังสรุปผล (ไทย / English / Malay)",
    addMore: "ทดลองเพิ่ม",
    next: "ไปต่อ",
  },
  en: {
    title: "📋 Experiment Record 4",
    subtitle: (count) => `Topic: Medium of Light • Total ${count} trials`,
    tableTitle: "Experiment Results",
    objectName: "Object Name",
    lightPass: "Light Through Object",
    classifyAs: "Classified As",
    passGood: "Passes Well",
    passSome: "Passes Partly",
    passNone: "Does Not Pass",
    transparent: "Transparent",
    translucent: "Translucent",
    opaque: "Opaque",
    summaryTitle: "📌 Experiment Summary",
    summaryItems: [
      "• Transparent objects let light pass well and can be seen clearly.",
      "• Translucent objects let some light pass and are not clearly seen.",
      "• Opaque objects do not let light pass and cannot be seen through.",
    ],
    speakLabel: "🔊 Listen to summary (Thai / English / Malay)",
    addMore: "Try More",
    next: "Next",
  },
  ms: {
    title: "📋 Rekod Eksperimen 4",
    subtitle: (count) => `Topik: Medium Cahaya • Jumlah ${count} kali eksperimen`,
    tableTitle: "Keputusan Eksperimen",
    objectName: "Nama Objek",
    lightPass: "Cahaya Melalui Objek",
    classifyAs: "Klasifikasi Objek",
    passGood: "Menembusi Baik",
    passSome: "Menembusi Sebahagian",
    passNone: "Tidak Menembusi",
    transparent: "Lutsinar",
    translucent: "Lut Separa",
    opaque: "Legap",
    summaryTitle: "📌 Ringkasan Eksperimen",
    summaryItems: [
      "• Objek lutsinar membenarkan cahaya melalui dengan baik dan boleh dilihat jelas.",
      "• Objek lut separa membenarkan sebahagian cahaya dan tidak jelas dilihat.",
      "• Objek legap tidak membenarkan cahaya melalui dan tidak boleh dilihat tembus.",
    ],
    speakLabel: "🔊 Dengar ringkasan (Thai / English / Malay)",
    addMore: "Cuba Lagi",
    next: "Seterusnya",
  },
};

export default function P4LightRecord() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [language, setLanguage] = useState("th");

  const pendingResults = useMemo(() => state?.pendingResults ?? [], [state]);
  const ui = UI[language] ?? UI.th;

  const counts = useMemo(
    () => ({
      transparent: pendingResults.filter((item) => item.material.type === "transparent").length,
      translucent: pendingResults.filter((item) => item.material.type === "translucent").length,
      opaque: pendingResults.filter((item) => item.material.type === "opaque").length,
    }),
    [pendingResults]
  );

  const speakTexts = useMemo(
    () => ({
      th: `สรุปผลการทดลองเรื่องตัวกลางของแสง ทดลองทั้งหมด ${pendingResults.length} ครั้ง วัตถุโปร่งใส ${counts.transparent} ครั้ง วัตถุโปร่งแสง ${counts.translucent} ครั้ง และวัตถุทึบแสง ${counts.opaque} ครั้ง`,
      en: `Light medium experiment summary. Total experiments ${pendingResults.length}. Transparent objects ${counts.transparent}, translucent objects ${counts.translucent}, and opaque objects ${counts.opaque}.`,
      ms: `Ringkasan eksperimen medium cahaya. Jumlah eksperimen ${pendingResults.length} kali. Objek lutsinar ${counts.transparent}, objek lut separa ${counts.translucent}, dan objek legap ${counts.opaque}.`,
    }),
    [pendingResults.length, counts]
  );

  useEffect(() => {
    if (!pendingResults.length) {
      navigate("/p4/light/experiment");
    }
  }, [pendingResults.length, navigate]);

  const goToSummary = () => {
    navigate("/p4/light/summary", {
      state: {
        allResults: pendingResults,
        fromRecord: true,
      },
    });
  };

  const getMaterialName = (item) => {
    const byImage = MATERIAL_NAMES[item.material.img]?.[language];
    return byImage || item.material.name;
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-blue-200 bg-white/80 p-6 shadow-lg backdrop-blur-md">
          <h1 className="mb-2 text-3xl font-bold text-blue-800">{ui.title}</h1>
          <p className="text-blue-600">{ui.subtitle(pendingResults.length)}</p>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border-2 border-blue-300 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
            <h2 className="text-xl font-bold">{ui.tableTitle}</h2>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border-2 border-blue-300 p-3 text-left" rowSpan="2">
                    {ui.objectName}
                  </th>
                  <th className="border-2 border-blue-300 p-3 text-center" colSpan="3">
                    {ui.lightPass}
                  </th>
                  <th className="border-2 border-blue-300 p-3 text-center" colSpan="3">
                    {ui.classifyAs}
                  </th>
                </tr>
                <tr className="bg-blue-50">
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.passGood}</th>
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.passSome}</th>
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.passNone}</th>
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.transparent}</th>
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.translucent}</th>
                  <th className="border-2 border-blue-300 p-2 text-center">{ui.opaque}</th>
                </tr>
              </thead>
              <tbody>
                {pendingResults.map((item, index) => {
                  const isTransparent = item.material.type === "transparent";
                  const isTranslucent = item.material.type === "translucent";
                  const isOpaque = item.material.type === "opaque";

                  return (
                    <tr key={index} className="transition hover:bg-blue-50">
                      <td className="border-2 border-blue-300 p-3 font-medium">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded p-1 ${
                              isTransparent ? "bg-blue-100" : isTranslucent ? "bg-yellow-100" : "bg-gray-100"
                            }`}
                          >
                            <img src={item.material.img} alt="" className="h-full w-full object-contain" />
                          </div>
                          {getMaterialName(item)}
                        </div>
                      </td>

                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isTransparent && "✓"}</td>
                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isTranslucent && "~"}</td>
                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isOpaque && "✗"}</td>

                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isTransparent && "✓"}</td>
                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isTranslucent && "✓"}</td>
                      <td className="border-2 border-blue-300 p-3 text-center text-2xl">{isOpaque && "✓"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6 rounded-xl border-2 border-green-300 bg-green-50 p-4">
          <h3 className="mb-2 font-bold text-green-800">{ui.summaryTitle}</h3>
          <ul className="space-y-1 text-sm">
            {ui.summaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6 rounded-xl border-2 border-blue-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-blue-700">{ui.speakLabel}</p>
          <SpeakButton
            th={speakTexts.th}
            en={speakTexts.en}
            ms={speakTexts.ms}
            activeLang={language}
            onLanguageChange={setLanguage}
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => navigate("/p4/light/experiment")}
            className="flex items-center gap-2 rounded-xl bg-gray-500 px-6 py-3 text-white transition hover:bg-gray-600"
          >
            <span>◀</span>
            {ui.addMore}
          </button>

          <button
            onClick={goToSummary}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-white transition hover:shadow-lg"
          >
            {ui.next}
            <span>▶</span>
          </button>
        </div>
      </div>
    </div>
  );
}
