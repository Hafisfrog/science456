import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VOCAB = [
  { th: "แรงดึงดูด", ms: "gaya tarikan", en: "Gravitational Force" },
  { th: "แรงผลัก", ms: "gaya tolakan", en: "Push Force" },
  { th: "แรงไม่มีสัมผัส", ms: "daya tanpa sentuhan", en: "Non-contact Force" },
  { th: "ประจุไฟฟ้า", ms: "cas atau P", en: "Electric Charge" },
  { th: "แรงไฟฟ้า", ms: "daya QP", en: "Electric Force" },
  { th: "ความชื้น", ms: "kelembapan", en: "Humidity" },
];

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const synth = window.speechSynthesis;

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const voices = synth.getVoices();

  let voice =
    voices.find((v) => v.lang === lang) ||
    voices.find((v) => v.lang.startsWith(lang.split("-")[0])) ||
    voices[0];

  if (voice) utterance.voice = voice;

  synth.speak(utterance);
}

export default function P6ElectricVocab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ⭐ โหลด voices ให้ Chrome
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const isUnitFlow =
    pathname === "/p6/electric-force/vocab" ||
    pathname.startsWith("/p6/electric-force/");

  const backPath = isUnitFlow
    ? "/p6/electric-force"
    : "/p6/experiment/electric-generation";

  const nextPath = isUnitFlow
    ? "/p6/electric-force/experiments"
    : "/p6/experiment/electric-generation/materials";

  const backLabel = isUnitFlow
    ? "กลับหน้าหน่วยการเรียนรู้"
    : "กลับหน้าจุดประสงค์";

  const nextLabel = isUnitFlow
    ? "ไปหน้าเลือกการทดลอง"
    : "ไปหน้าถัดไป";

  const subtitle = isUnitFlow
    ? "เรื่อง แรงไฟฟ้าน่ารู้"
    : "เรื่อง การเกิดแรงไฟฟ้า";

  const onSpeak = useCallback((text, lang) => {
    speakText(text, lang);
  }, []);

  return (
    <div
      className="min-h-screen overflow-hidden px-4 py-5 md:px-6"
      style={{
        fontFamily: "Prompt, sans-serif",
        background:
          "radial-gradient(80% 58% at 50% 34%, #f6efef 0 62%, transparent 63%), radial-gradient(30% 22% at 10% 34%, #c9e9f4 0 58%, transparent 59%), radial-gradient(30% 22% at 90% 34%, #c9e9f4 0 58%, transparent 59%), linear-gradient(180deg, #c8deeb 0%, #d7e8f1 100%)",
      }}
    >
      <div className="mx-auto max-w-[1240px] rounded-3xl bg-white/90 p-5 shadow-lg">

        <header className="mb-4 text-center">
          <h1 className="m-0 text-4xl font-extrabold text-blue-700 md:text-5xl">
            คำศัพท์วิทยาศาสตร์น่ารู้
          </h1>

          <p className="mt-2 text-2xl font-semibold text-slate-700 md:text-3xl">
            {subtitle}
          </p>
        </header>

        <section className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[980px] border-collapse">

            <thead>
              <tr className="bg-slate-100 text-2xl">
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

                    <div className="flex items-center justify-center gap-2">

                      <button
                        className="rounded-full bg-rose-500 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.th, "th-TH")}
                        type="button"
                      >
                        TH
                      </button>

                      <button
                        className="rounded-full bg-amber-500 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.ms, "ms-MY")}
                        type="button"
                      >
                        MY
                      </button>

                      <button
                        className="rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white"
                        onClick={() => onSpeak(row.en, "en-US")}
                        type="button"
                      >
                        EN
                      </button>

                    </div>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </section>

        <div className="fixed bottom-3 right-3 z-20 flex items-center gap-3 md:bottom-6 md:right-6">

          <button
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-slate-700 shadow"
            onClick={() => navigate(backPath)}
            type="button"
          >
            ←
          </button>

          <button
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow"
            onClick={() => navigate(nextPath)}
            type="button"
          >
            →
          </button>

        </div>

      </div>
    </div>
  );
}