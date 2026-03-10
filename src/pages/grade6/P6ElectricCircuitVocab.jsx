import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const VOCAB = [
  { th: "วงจรไฟฟ้า", ms: "litar elektrik", en: "Electric Circuit" },
  { th: "แหล่งกำเนิดไฟฟ้า", ms: "sumber kuasa", en: "Power Source" },
  { th: "สายไฟฟ้า", ms: "wayar elektrik", en: "Electric Wire" },
  { th: "เครื่องใช้ไฟฟ้า", ms: "peralatan elektrik", en: "Electrical Appliance" },
  { th: "ถ่านไฟฉาย", ms: "bateri lampu suluh", en: "Flashlight Battery" },
  { th: "แบตเตอรี่", ms: "bateri", en: "Battery" },
  { th: "เซลล์ไฟฟ้า", ms: "sel elektrik", en: "Electric Cell" },
  { th: "แบบอนุกรม", ms: "sel bersiri", en: "Electric cells in series" },
  { th: "แบบขนาน", ms: "sel selari", en: "Electric cells in parallel" },
  { th: "วงจรเปิด", ms: "litar terbuka", en: "Open Circuit" },
  { th: "วงจรปิด", ms: "litar tertutup", en: "Closed Circuit" },
  { th: "ตัวนำไฟฟ้า", ms: "konduktor elektrik", en: "Electrical Conductor" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase());
  const fallback = voices.find((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2)));

  if (exact || fallback) utterance.voice = exact || fallback;

  window.speechSynthesis.speak(utterance);
}

export default function P6ElectricCircuitVocab() {

  const navigate = useNavigate();

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div
      className="h-screen overflow-hidden px-4 py-5 md:px-6"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >

      <div className="mx-auto max-w-[1240px] rounded-3xl bg-white/90 p-5 shadow-lg">

        <header className="mb-4 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 md:text-5xl">
            คำศัพท์วิทยาศาสตร์น่ารู้
          </h1>

          <p className="mt-2 text-2xl font-semibold text-slate-700 md:text-3xl">
            เรื่อง วงจรไฟฟ้าใกล้ตัว
          </p>
        </header>

        {/* ตาราง scroll */}
        <section className="h-[65vh] overflow-y-auto rounded-2xl border border-slate-200">

          <table className="w-full border-collapse">

            <thead className="sticky top-0 bg-slate-100 text-2xl">

              <tr>
                <th className="border border-slate-300 px-3 py-3 text-left">
                  ภาษาไทย
                </th>

                <th className="border border-slate-300 px-3 py-3 text-left">
                  ภาษามลายู
                </th>

                <th className="border border-slate-300 px-3 py-3 text-left">
                  ภาษาอังกฤษ
                </th>

                <th className="border border-slate-300 px-3 py-3 text-center">
                  ฟังเสียง
                </th>
              </tr>

            </thead>

            <tbody>

              {VOCAB.map((row, index) => (

                <tr key={index} className="bg-white even:bg-slate-50">

                  <td className="border border-slate-300 px-3 py-3 text-2xl">
                    {row.th}
                  </td>

                  <td className="border border-slate-300 px-3 py-3 text-2xl">
                    {row.ms}
                  </td>

                  <td className="border border-slate-300 px-3 py-3 text-2xl">
                    {row.en}
                  </td>

                  <td className="border border-slate-300 px-3 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        className="rounded-full bg-rose-500 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.th, "th-TH")}
                      >
                        TH
                      </button>

                      <button
                        className="rounded-full bg-amber-500 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.ms, "ms-MY")}
                      >
                        MY
                      </button>

                      <button
                        className="rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.en, "en-GB")}
                      >
                        GB
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>

        {/* ปุ่ม */}
        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">

          <button
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-slate-700 shadow"
            onClick={() => navigate("/p6/electric-circuit/objectives")}
          >
            ←
          </button>

          <button
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow"
            onClick={() => navigate("/p6/electric-circuit/experiments")}
          >
            →
          </button>

        </div>

      </div>
    </div>
  );
}