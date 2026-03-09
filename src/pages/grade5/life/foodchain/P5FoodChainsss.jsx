import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../../components/SpeakButton";

function ChainArrow() {
  return (
    <svg viewBox="0 0 48 16" className="h-4 w-8 md:h-5 md:w-10" aria-hidden="true">
      <line x1="2" y1="8" x2="40" y2="8" stroke="#111827" strokeWidth="2" />
      <path d="M40 3L46 8L40 13" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChainIcon({ kind }) {
  if (kind === "carrot") {
    return (
      <g>
        <path d="M16 12 C20 8, 28 8, 32 12 C30 16, 18 16, 16 12Z" fill="#6b8e23" />
        <path d="M20 13 C22 10, 26 10, 28 13 L31 20 L17 20 Z" fill="#7aa43a" />
        <path d="M13 42 C12 32, 20 25, 34 21 C46 18, 52 21, 55 26 C58 32, 55 37, 44 46 C33 55, 23 58, 17 56 C14 54, 13 49, 13 42 Z" fill="#f08a2b" />
        <path d="M22 30 L43 24" stroke="#d86c1c" strokeWidth="2" />
        <path d="M19 38 L39 33" stroke="#d86c1c" strokeWidth="2" />
        <path d="M16 45 L33 41" stroke="#d86c1c" strokeWidth="2" />
      </g>
    );
  }

  if (kind === "rabbit") {
    return (
      <g>
        <ellipse cx="31" cy="18" rx="7" ry="12" fill="#d7dbe7" />
        <ellipse cx="42" cy="18" rx="7" ry="12" fill="#d7dbe7" />
        <ellipse cx="31" cy="20" rx="3" ry="7" fill="#f2b7c9" />
        <ellipse cx="42" cy="20" rx="3" ry="7" fill="#f2b7c9" />
        <circle cx="36.5" cy="38" r="18" fill="#e8ecf7" />
        <circle cx="30" cy="36" r="2.2" fill="#111827" />
        <circle cx="43" cy="36" r="2.2" fill="#111827" />
        <ellipse cx="36.5" cy="44" rx="4.5" ry="3.5" fill="#f2b7c9" />
      </g>
    );
  }

  if (kind === "snake") {
    return (
      <g>
        <path
          d="M10 48 C15 30, 33 28, 38 38 C41 45, 35 51, 28 51 C21 51, 16 46, 16 41 C16 35, 22 31, 28 31 C37 31, 45 37, 50 45"
          fill="none"
          stroke="#2cb67d"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="50" cy="45" r="5" fill="#2cb67d" />
        <circle cx="52" cy="44" r="1.5" fill="#111827" />
      </g>
    );
  }

  return (
    <g>
      <ellipse cx="24" cy="44" rx="8" ry="7" fill="#c08a62" />
      <path d="M18 46 L8 52 L17 42 Z" fill="#8b5e3c" />
      <path d="M31 44 L50 38 L39 49 Z" fill="#9a6a47" />
      <path d="M46 40 L57 36 L52 45 Z" fill="#7a4e32" />
      <circle cx="28" cy="42" r="1.6" fill="#111827" />
    </g>
  );
}

function ChainNode({ label, kind }) {
  return (
    <svg viewBox="0 0 184 60" className="h-[54px] w-[170px] sm:h-[60px] sm:w-[184px]" role="img" aria-label={label}>
      <rect x="2" y="2" width="180" height="56" rx="16" fill="#ebdcc2" />
      <foreignObject x="10" y="13" width="34" height="34">
        <svg viewBox="0 0 64 64" width="34" height="34" aria-hidden="true">
          <ChainIcon kind={kind} />
        </svg>
      </foreignObject>
      <text x="48" y="38" fontSize="16" fill="#111827" fontWeight="700">
        {label}
      </text>
    </svg>
  );
}

const CONTENT = {
  th: {
    title: "สรุปสาระสำคัญ: การถ่ายทอดพลังงานในห่วงโซ่อาหาร",
    intro:
      "ห่วงโซ่อาหาร คือ ความสัมพันธ์ของสิ่งมีชีวิตที่กินกันเป็นลำดับ ทำให้พลังงานถ่ายทอดจากผู้ผลิตไปยังผู้บริโภค",
    exampleTitle: "ตัวอย่างห่วงโซ่อาหารและการถ่ายทอดพลังงาน",
    exampleItems: [
      { key: "carrot", label: "แครอท" },
      { key: "rabbit", label: "กระต่าย" },
      { key: "snake", label: "งู" },
      { key: "eagle", label: "เหยี่ยว" },
    ],
    categories: [
      {
        title: "ผู้ผลิต",
        desc: "สิ่งมีชีวิตที่สร้างอาหารเองได้ เช่น พืช หญ้า และสาหร่าย",
        className: "border-green-200 text-green-700",
      },
      {
        title: "สัตว์กินพืช",
        desc: "เช่น หนอน ตั๊กแตน วัว กระต่าย",
        className: "border-blue-200 text-blue-700",
      },
      {
        title: "สัตว์กินพืชและสัตว์",
        desc: "เช่น ไก่ เป็ด หมู หมี ลิง มนุษย์",
        className: "border-yellow-200 text-yellow-700",
      },
      {
        title: "สัตว์กินเนื้อ",
        desc: "เช่น สิงโต งู เสือ จระเข้ เหยี่ยว",
        className: "border-red-200 text-red-700",
      },
    ],
    decomposerTitle: "ผู้ย่อยสลายและผู้กินซาก",
    decomposerDesc:
      "ช่วยย่อยสลายซากพืชซากสัตว์ให้กลายเป็นแร่ธาตุในดิน เช่น เห็ด รา และแบคทีเรีย",
    back: "ย้อนกลับ",
    next: "จบบทเรียน",
  },
  en: {
    title: "Key Summary: Energy Transfer in Food Chains",
    intro:
      "A food chain is the relationship among living things in feeding order, where energy is transferred from producers to consumers.",
    exampleTitle: "Example of a Food Chain and Energy Transfer",
    exampleItems: [
      { key: "carrot", label: "Carrot" },
      { key: "rabbit", label: "Rabbit" },
      { key: "snake", label: "Snake" },
      { key: "eagle", label: "Eagle" },
    ],
    categories: [
      {
        title: "Producer",
        desc: "Living things that make their own food, such as plants, grass, and algae.",
        className: "border-green-200 text-green-700",
      },
      {
        title: "Herbivore",
        desc: "Examples: caterpillar, grasshopper, cow, rabbit.",
        className: "border-blue-200 text-blue-700",
      },
      {
        title: "Omnivore",
        desc: "Examples: chicken, duck, pig, bear, monkey, human.",
        className: "border-yellow-200 text-yellow-700",
      },
      {
        title: "Carnivore",
        desc: "Examples: lion, snake, tiger, crocodile, eagle.",
        className: "border-red-200 text-red-700",
      },
    ],
    decomposerTitle: "Decomposer and Scavenger",
    decomposerDesc:
      "They break down dead plants and animals into minerals in soil, such as fungi, mold, and bacteria.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Ringkasan Utama: Pemindahan Tenaga dalam Rantai Makanan",
    intro:
      "Rantai makanan ialah hubungan antara hidupan mengikut urutan pemakanan, di mana tenaga dipindahkan daripada pengeluar kepada pengguna.",
    exampleTitle: "Contoh Rantai Makanan dan Pemindahan Tenaga",
    exampleItems: [
      { key: "carrot", label: "Lobak" },
      { key: "rabbit", label: "Arnab" },
      { key: "snake", label: "Ular" },
      { key: "eagle", label: "Helang" },
    ],
    categories: [
      {
        title: "Pengeluar",
        desc: "Hidupan yang menghasilkan makanan sendiri seperti tumbuhan, rumput, dan alga.",
        className: "border-green-200 text-green-700",
      },
      {
        title: "Herbivor",
        desc: "Contoh: ulat, belalang, lembu, arnab.",
        className: "border-blue-200 text-blue-700",
      },
      {
        title: "Omnivor",
        desc: "Contoh: ayam, itik, babi, beruang, monyet, manusia.",
        className: "border-yellow-200 text-yellow-700",
      },
      {
        title: "Karnivor",
        desc: "Contoh: singa, ular, harimau, buaya, helang.",
        className: "border-red-200 text-red-700",
      },
    ],
    decomposerTitle: "Pengurai dan Pemakan Bangkai",
    decomposerDesc:
      "Mereka menguraikan sisa tumbuhan dan haiwan menjadi mineral dalam tanah seperti kulat, kapang, dan bakteria.",
    back: "Kembali",
    next: "Seterusnya",
  },
};

export default function P5FoodChainsss() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const content = CONTENT[activeLang] ?? CONTENT.th;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6 font-sans">
      <div className="mx-auto max-w-6xl pb-28">
        <div className="mb-8 rounded-3xl border-2 border-green-200 bg-white p-8 text-center shadow-lg">
          <h1 className="mb-4 text-4xl font-extrabold text-green-700">{content.title}</h1>
          <p className="text-xl text-gray-700">{content.intro}</p>
        </div>

        <div className="mb-8 rounded-3xl border-2 border-orange-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-orange-600">{content.exampleTitle}</h2>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {content.exampleItems.map((item, index) => (
              <div key={item.key} className="flex items-center gap-2 md:gap-3">
                <ChainNode label={item.label} kind={item.key} />
                {index < content.exampleItems.length - 1 && <ChainArrow />}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-4">
          {content.categories.map((item) => (
            <div key={item.title} className={`rounded-2xl border-2 bg-white p-6 shadow ${item.className}`}>
              <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-3xl border-2 border-purple-200 bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-purple-700">{content.decomposerTitle}</h2>
          <p className="text-lg text-gray-700">{content.decomposerDesc}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-gray-500 px-8 py-4 text-xl font-bold text-white transition hover:shadow-xl"
          >
            {content.back}
          </button>

          <button
            onClick={() => navigate("/p5/life")}
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 text-xl font-bold text-white transition hover:shadow-xl"
          >
            {content.next}
          </button>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 z-50 max-w-[calc(100vw-2rem)] rounded-2xl bg-white/80 p-2 shadow-lg backdrop-blur">
        <SpeakButton
          th={`${CONTENT.th.intro} ${CONTENT.th.decomposerDesc}`}
          en={`${CONTENT.en.intro} ${CONTENT.en.decomposerDesc}`}
          ms={`${CONTENT.ms.intro} ${CONTENT.ms.decomposerDesc}`}
          activeLang={activeLang}
          onLanguageChange={setActiveLang}
        />
      </div>
    </div>
  );
}
