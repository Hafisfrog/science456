import { useLocation, useNavigate } from "react-router-dom";
import HomeButton from "../../HomeButton";
import { useEffect, useMemo, useState } from "react";
import { LightLanguageSwitcher, LightNavButtons } from "./LightControls";

const SPEECH_LOCALES = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

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
    rowSpeak: "ฟังผล",
    addMore: "ทดลองอีกครั้ง",
    back: "ย้อนกลับ",
    next: "ต่อไป",
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
    rowSpeak: "Listen",
    addMore: "Try Again",
    back: "Back",
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
    rowSpeak: "Dengar",
    addMore: "Cuba Semula",
    back: "Kembali",
    next: "Seterusnya",
  },
};

export default function P4LightRecord() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [language, setLanguage] = useState("th");

  const pendingResults = useMemo(() => state?.pendingResults ?? [], [state]);
  const uniqueResults = useMemo(() => {
    const seenMaterialIds = new Set();
    return pendingResults.filter((item) => {
      const materialId = item.material?.id;
      if (!materialId || seenMaterialIds.has(materialId)) {
        return false;
      }
      seenMaterialIds.add(materialId);
      return true;
    });
  }, [pendingResults]);
  const ui = UI[language] ?? UI.th;

  useEffect(() => {
    if (!uniqueResults.length) {
      navigate("/p4/light/experiment");
    }
  }, [uniqueResults.length, navigate]);

  const goToSummary = () => {
    navigate("/p4/light/summary", {
      state: {
        allResults: uniqueResults,
        fromRecord: true,
      },
    });
  };

  const getMaterialName = (item) => {
    const byImage = MATERIAL_NAMES[item.material.img]?.[language];
    return byImage || item.material.name;
  };
  const getRowLabels = (item) => {
    if (item.material.type === "transparent") {
      return { passLabel: ui.passGood, classifyLabel: ui.transparent };
    }
    if (item.material.type === "translucent") {
      return { passLabel: ui.passSome, classifyLabel: ui.translucent };
    }
    return { passLabel: ui.passNone, classifyLabel: ui.opaque };
  };
  const buildRowSpeakText = (item) => {
    const materialName = getMaterialName(item);
    const { passLabel, classifyLabel } = getRowLabels(item);

    if (language === "en") {
      return `${materialName}. ${ui.lightPass}: ${passLabel}. ${ui.classifyAs}: ${classifyLabel}.`;
    }
    if (language === "ms") {
      return `${materialName}. ${ui.lightPass}: ${passLabel}. ${ui.classifyAs}: ${classifyLabel}.`;
    }
    return `${materialName} ${ui.lightPass} ${passLabel} ${ui.classifyAs} ${classifyLabel}`;
  };
  const tableBorderClass = "border-[1.5px] border-[#a9c6dc]";
  const tableCellClass = `${tableBorderClass} bg-white/42`;
  const tableHeaderTopClass = `${tableBorderClass} bg-[#d7e6f1]/92 text-[#17344d]`;
  const tableHeaderSubClass = `${tableBorderClass} bg-[#e6f0f7]/92 text-[#23445f]`;
  const speakRowResult = (item) => {
    if (
      typeof window === "undefined" ||
      typeof SpeechSynthesisUtterance === "undefined" ||
      !window.speechSynthesis
    ) {
      return;
    }

    const synth = window.speechSynthesis;
    const text = buildRowSpeakText(item);
    const targetLocale = SPEECH_LOCALES[language] || "th-TH";

    const doSpeak = () => {
      const voices = synth.getVoices();
      const localeLower = targetLocale.toLowerCase();
      const prefix = localeLower.split("-")[0];

      let voice =
        voices.find((v) => v.lang?.toLowerCase() === localeLower) ||
        voices.find((v) => v.lang?.toLowerCase().startsWith(prefix));

      if (language === "ms") {
        // Prefer Malay voice, then Indonesian as closest fallback.
        voice =
          voices.find((v) => v.lang?.toLowerCase() === "ms-my") ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("ms")) ||
          voices.find((v) => /malay|melayu/i.test(v.name || "")) ||
          voices.find((v) => v.lang?.toLowerCase() === "id-id") ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("id")) ||
          voices.find((v) => /indonesian|bahasa/i.test(v.name || "")) ||
          voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
          voices[0];
      }

      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || targetLocale;
      utterance.rate = language === "ms" ? 0.9 : 0.92;
      utterance.pitch = 1;
      synth.cancel();
      synth.speak(utterance);
    };

    const voices = synth.getVoices();
    if (voices.length) {
      doSpeak();
      return;
    }

    let spoke = false;
    const speakOnce = () => {
      if (spoke) return;
      spoke = true;
      doSpeak();
    };
    const onVoicesChanged = () => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    };

    synth.addEventListener("voiceschanged", onVoicesChanged);
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      speakOnce();
    }, 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#dceaf5] via-[#d6e6f2] to-[#c7d9e8] font-['Prompt',sans-serif]">
      <HomeButton />

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/images/materials/back.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-45 [background:radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.84),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(220,235,246,0.88),transparent_40%),linear-gradient(180deg,rgba(238,246,252,0.4),rgba(201,219,235,0.32))]" />

      <div className="relative z-10 min-h-screen overflow-y-auto p-4 pb-28 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 overflow-hidden rounded-[28px] border border-[#bfd3e3] bg-[linear-gradient(180deg,rgba(244,248,251,0.88),rgba(228,237,245,0.82))] shadow-[0_16px_38px_rgba(106,138,165,0.16)] backdrop-blur-md">
          <div className="border-b border-[#bed3e3] bg-gradient-to-r from-[#91bad6] via-[#89b4d1] to-[#7ca7c6] p-4 text-[#133149]">
            <h2 className="text-4xl font-black drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{ui.tableTitle}</h2>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-transparent">
                  <th className={`${tableHeaderTopClass} p-3 text-center text-xl font-black`} rowSpan="2">
                    {ui.objectName}
                  </th>
                  <th className={`${tableHeaderTopClass} p-3 text-center text-xl font-black`} colSpan="3">
                    {ui.lightPass}
                  </th>
                  <th className={`${tableHeaderTopClass} p-3 text-center text-xl font-black`} colSpan="3">
                    {ui.classifyAs}
                  </th>
                </tr>
                <tr className="bg-transparent">
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.passGood}</th>
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.passSome}</th>
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.passNone}</th>
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.transparent}</th>
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.translucent}</th>
                  <th className={`${tableHeaderSubClass} p-2 text-center text-lg font-black`}>{ui.opaque}</th>
                </tr>
              </thead>
              <tbody>
                {uniqueResults.map((item, index) => {
                  const isTransparent = item.material.type === "transparent";
                  const isTranslucent = item.material.type === "translucent";
                  const isOpaque = item.material.type === "opaque";

                  return (
                    <tr key={index} className="transition hover:bg-[#edf4fa]/85">
                      <td className={`${tableCellClass} p-3 font-medium text-[#17344d]`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-4">
                            <div
                              className={`h-20 w-20 rounded-2xl border border-white/70 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${
                                isTransparent
                                  ? "bg-[#d8e9f5]"
                                  : isTranslucent
                                    ? "bg-[#e9edf2]"
                                    : "bg-[#dde4ec]"
                              }`}
                            >
                              <img src={item.material.img} alt="" className="h-full w-full object-contain" />
                            </div>
                            <span>{getMaterialName(item)}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => speakRowResult(item)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#a9c6dc] bg-[#edf4fa] text-sm text-[#537391] transition hover:bg-[#dfeaf3]"
                            aria-label={`${ui.rowSpeak} ${getMaterialName(item)}`}
                          >
                            🔊
                          </button>
                        </div>
                      </td>

                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isTransparent && "✓"}</td>
                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isTranslucent && "✓"}</td>
                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isOpaque && "✓"}</td>

                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isTransparent && "✓"}</td>
                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isTranslucent && "✓"}</td>
                      <td className={`${tableCellClass} p-3 text-center text-2xl text-[#17344d]`}>{isOpaque && "✓"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-30">
        <LightLanguageSwitcher
          value={language}
          onChange={setLanguage}
          labels={{ th: "ไทย", en: "อังกฤษ", ms: "มลายู" }}
        />
      </div>

      <div className="fixed bottom-[18px] left-1/2 z-30 -translate-x-1/2 font-['Prompt',sans-serif]">
        <button
          type="button"
          onClick={() => navigate("/p4/light/experiment")}
          className="inline-flex h-[62px] min-w-[190px] items-center justify-center whitespace-nowrap rounded-[18px] bg-white/96 px-6 text-[20px] font-black text-slate-950 shadow-[0_12px_24px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(15,23,42,0.22)] active:translate-y-[1px] max-[720px]:h-[44px] max-[720px]:min-w-[128px] max-[720px]:px-4 max-[720px]:text-[16px]"
        >
          ↺ {ui.addMore}
        </button>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-30">
        <LightNavButtons
          backLabel={ui.back}
          nextLabel={ui.next}
          onBack={() => navigate("/p4/light/experiment")}
          onNext={goToSummary}
        />
      </div>
    </div>
  );
}
