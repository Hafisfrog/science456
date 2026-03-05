import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../components/SpeakButton";

const CONTENT = {
  th: {
    title: "สถานการณ์ปัญหา",
    paragraphs: [
      'ผู้เรียนสวมบทบาทเป็น "นักวิทยาศาสตร์" ที่ต้องระบุสิ่งของภายในกล่องผ่านตัวกลางชนิดต่าง ๆ',
      "นักเรียนอยู่ในห้องเรียนวิทยาศาสตร์ที่มืดสนิท มีกล่องปริศนา 3 ใบ แต่ละใบมีแผ่นวัสดุปิดช่องมองด้านหน้า",
      "นักเรียนต้องสังเกตแสงที่ผ่านวัสดุแต่ละชนิด เพื่อค้นหาว่าในกล่องมีอะไรอยู่",
    ],
    speakText:
      "สถานการณ์ปัญหา นักเรียนสวมบทบาทเป็นนักวิทยาศาสตร์ เพื่อสังเกตแสงที่ผ่านวัสดุแต่ละชนิด แล้วทายว่าสิ่งของในกล่องคืออะไร",
    back: "◀ ย้อนกลับ",
    next: "ต่อไป ▶",
  },
  en: {
    title: "Problem Situation",
    paragraphs: [
      'Students take the role of a "scientist" who must identify objects inside a box through different light media.',
      "The class is in a dark science room with 3 mystery boxes. Each box has a different material covering the viewing window.",
      "Students observe how light passes through each material to determine what object is inside each box.",
    ],
    speakText:
      "Problem situation: students act as scientists and observe light through different materials to identify objects inside mystery boxes.",
    back: "◀ Back",
    next: "Next ▶",
  },
  ms: {
    title: "Situasi Masalah",
    paragraphs: [
      'Murid memainkan peranan sebagai "saintis" yang perlu mengenal pasti objek di dalam kotak melalui medium cahaya yang berbeza.',
      "Murid berada di dalam bilik sains yang gelap dengan 3 kotak misteri. Setiap kotak mempunyai bahan penutup pada ruang melihat.",
      "Murid memerhati cahaya yang melalui setiap bahan untuk menentukan objek yang berada di dalam kotak.",
    ],
    speakText:
      "Situasi masalah: murid bertindak sebagai saintis dan memerhati cahaya melalui bahan yang berbeza untuk mengenal pasti objek dalam kotak misteri.",
    back: "◀ Kembali",
    next: "Seterusnya ▶",
  },
};

export default function P4LightSituation() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("th");
  const content = CONTENT[language] ?? CONTENT.th;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 px-4 py-10 font-['Prompt',sans-serif] sm:px-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8 rounded-3xl border-2 border-blue-200 bg-white/95 p-8 text-center shadow-[0_8px_22px_rgba(0,0,0,0.08)] sm:p-10">
          <h1 className="text-3xl font-extrabold text-blue-700 sm:text-4xl">{content.title}</h1>
        </div>

        <div className="mb-10 rounded-3xl border-2 border-sky-300 bg-white p-7 text-base leading-8 text-slate-600 shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:p-10 sm:text-xl sm:leading-9">
          {content.paragraphs.map((text) => (
            <p key={text} className="mb-4 last:mb-0">
              {text}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center [&_.mt-3]:mt-0">
            <SpeakButton
              th={CONTENT.th.speakText}
              en={CONTENT.en.speakText}
              ms={CONTENT.ms.speakText}
              activeLang={language}
              onLanguageChange={setLanguage}
            />
          </div>

          <div className="ml-auto flex w-full justify-end gap-4 sm:w-auto">
            <button
              className="rounded-full bg-slate-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
              type="button"
              onClick={() => navigate("/p4/light/basic")}
            >
              {content.back}
            </button>

            <button
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-7 py-3 text-base font-bold text-white transition hover:opacity-90"
              type="button"
              onClick={() => navigate("/p4/light/select")}
            >
              {content.next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
