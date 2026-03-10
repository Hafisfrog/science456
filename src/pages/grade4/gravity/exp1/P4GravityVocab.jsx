import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const VOCAB = [
  {
    th: "แรงโน้มถ่วงของโลก",
    ms: "กราวีตี ดูนีโย",
    en: "Earth's Gravity",
    audio: {
      th: "/audio/p4/gravity/gravity_th.mp3",
      ms: "/audio/p4/gravity/gravity_ms.mp3",
      en: "/audio/p4/gravity/gravity_en.mp3",
    },
  },
  {
    th: "สู่ศูนย์กลางของโลก",
    ms: "ตูจู ปูสัก ดูนีโย",
    en: "To the Center of the Earth",
    audio: {
      th: "/audio/p4/gravity/center_th.mp3",
      ms: "/audio/p4/gravity/center_ms.mp3",
      en: "/audio/p4/gravity/center_en.mp3",
    },
  },
  {
    th: "น้ำหนัก",
    ms: "เบอรัต",
    en: "Weight",
    audio: {
      th: "/audio/p4/gravity/weight_th.mp3",
      ms: "/audio/p4/gravity/weight_ms.mp3",
      en: "/audio/p4/gravity/weight_en.mp3",
    },
  },
  {
    th: "มวล",
    ms: "จีซิม",
    en: "Mass",
    audio: {
      th: "/audio/p4/gravity/mass_th.mp3",
      ms: "/audio/p4/gravity/mass_ms.mp3",
      en: "/audio/p4/gravity/mass_en.mp3",
    },
  },
];

export default function P4GravityVocab() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const speakFallback = (text, langKey) => {
    try {
      if (!window.speechSynthesis) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = langKey === "th" ? "th-TH" : langKey === "ms" ? "ms-MY" : "en-US";
      window.speechSynthesis.speak(utter);
    } catch {
      // ignore
    }
  };

  const playWord = (row, langKey) => {
    const src = row.audio?.[langKey];
    const text = row[langKey];

    stopAudio();

    if (src) {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.play().catch(() => {
        speakFallback(text, langKey);
      });
      return;
    }

    speakFallback(text, langKey);
  };

  const audioBtnClass =
    "mx-1 rounded-[10px] px-[10px] py-2 text-[18px] shadow-[0_4px_10px_rgba(0,0,0,.15)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,.18)]";

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#f0f9ff,#e6f4ff)] px-5 py-[50px] font-['Prompt',sans-serif]">
      <header className="mb-7 text-center">
        <h1 className="m-0 text-[44px] font-extrabold text-[#e85a6b]">คำศัพท์วิทยาศาสตร์น่ารู้</h1>
        <p className="mt-2 text-[18px] text-gray-700">เรื่อง แรงโน้มถ่วงของโลก</p>
      </header>

      <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[22px] bg-white shadow-[0_14px_30px_rgba(0,0,0,.1)]">
        <table className="w-full border-collapse text-[20px]">
          <thead>
            <tr>
              <th className="bg-[#a7c7e7] px-[18px] py-5 text-left">ภาษาไทย</th>
              <th className="bg-[#f6cc6b] px-[18px] py-5 text-left">ภาษามลายู</th>
              <th className="bg-[#c084b3] px-[18px] py-5 text-left">ภาษาอังกฤษ</th>
              <th className="bg-[#d1fae5] px-[18px] py-5 text-center">ฟังเสียง</th>
            </tr>
          </thead>
          <tbody>
            {VOCAB.map((row, idx) => (
              <tr key={idx} className={idx !== VOCAB.length - 1 ? "border-b border-[#e5e7eb]" : ""}>
                <td className="bg-[#eaf4ff] px-[18px] py-5 text-left font-semibold">{row.th}</td>
                <td className="bg-[#fff3d6] px-[18px] py-5 text-left">{row.ms}</td>
                <td className="bg-[#f9d9ec] px-[18px] py-5 text-left">{row.en}</td>
                <td className="bg-[#ecfdf5] px-[18px] py-5 text-center">
                  <button
                    className={`${audioBtnClass} bg-[#dbeafe]`}
                    type="button"
                    onClick={() => playWord(row, "th")}
                    title="ฟังภาษาไทย"
                  >
                    TH
                  </button>
                  <button
                    className={`${audioBtnClass} bg-[#fde68a]`}
                    type="button"
                    onClick={() => playWord(row, "ms")}
                    title="ฟังภาษามลายู"
                  >
                    MY
                  </button>
                  <button
                    className={`${audioBtnClass} bg-[#fbcfe8]`}
                    type="button"
                    onClick={() => playWord(row, "en")}
                    title="ฟังภาษาอังกฤษ"
                  >
                    GB
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-[26px] flex max-w-[1000px] justify-between gap-[14px]">
        <button
          className="cursor-pointer rounded-[18px] bg-[linear-gradient(135deg,#ffffff,#f0f9ff)] px-5 py-3 text-[16px] font-bold text-[#1e3a8a] shadow-[0_8px_18px_rgba(0,0,0,.15)] transition duration-150 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,#e0f2fe,#ffffff)] hover:shadow-[0_12px_24px_rgba(0,0,0,.2)] active:translate-y-px active:shadow-[0_6px_14px_rgba(0,0,0,.18)]"
          type="button"
          onClick={() => navigate("/p4/gravity")}
        >
          ← กลับหน้าจุดประสงค์
        </button>

        <button
          className="cursor-pointer rounded-[14px] bg-[#2563eb] px-4 py-[14px] text-[16px] font-bold text-white shadow-[0_10px_22px_rgba(0,0,0,.15)] transition duration-150 hover:-translate-y-0.5"
          type="button"
          onClick={() => navigate("/p4/gravity/sim1")}
        >
          ไปหน้าถัดไป →
        </button>
      </div>
    </div>
  );
}
