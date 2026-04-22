import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

function FlowArrow({ vertical = false, color = "#ff4d43", compact = false }) {
  if (vertical) {
    return (
      <svg viewBox="0 0 24 50" className="h-8 w-4 xl:h-10 xl:w-5" aria-hidden="true">
        <path d="M12 3v34" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <path d="M4 31l8 12l8-12" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 54 24"
      className={compact ? "h-4 w-8 sm:h-5 sm:w-9 xl:h-5 xl:w-10" : "h-5 w-10 xl:h-6 xl:w-12"}
      aria-hidden="true"
    >
      <path d="M4 12h34" stroke={color} strokeWidth={compact ? "5" : "6"} strokeLinecap="round" />
      <path
        d="M30 4l16 8l-16 8"
        fill="none"
        stroke={color}
        strokeWidth={compact ? "5" : "6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const EXAMPLE_VISUALS = {
  carrot: {
    src: "/images/p5/k.png",
    className: "h-[56%] w-auto",
  },
  rabbit: {
    src: "/images/p5/t.png",
    className: "h-[56%] w-auto",
  },
  snake: {
    src: "/images/p5/snack.png",
    className: "w-[52%] h-auto",
  },
  eagle: {
    src: "/images/p5/y.png",
    className: "w-[56%] h-auto",
  },
};

function ExampleNode({ label, kind, ringClass }) {
  const visual = EXAMPLE_VISUALS[kind] ?? EXAMPLE_VISUALS.carrot;

  return (
    <div className="flex min-w-[4.25rem] flex-col items-center gap-2 text-center sm:min-w-[5rem] xl:min-w-[5.5rem]">
      <div
        className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[4px] bg-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] sm:h-[5.25rem] sm:w-[5.25rem] xl:h-[5.8rem] xl:w-[5.8rem] ${ringClass}`}
      >
        <img src={visual.src} alt="" className={`object-contain ${visual.className}`} />
      </div>
      <span className="text-sm font-black text-slate-800 sm:text-base xl:text-[1rem]">{label}</span>
    </div>
  );
}

function ProducerScene() {
  return (
    <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-[45%] border-[3px] border-[#66b94d] bg-[#dcf8c8] shadow-[0_14px_28px_rgba(34,197,94,0.18)] xl:h-48 xl:w-48">
      <img src="/images/p5/fos.png" alt="" className="h-full w-full object-cover" />
      <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-white/78 px-2 py-1 backdrop-blur-sm xl:bottom-3 xl:gap-1.5 xl:px-2.5 xl:py-1.5">
        <img src="/images/p5/kaw.png" alt="" className="h-6 w-6 object-contain xl:h-8 xl:w-8" />
        <img src="/images/p5/ya.png" alt="" className="h-6 w-6 object-contain xl:h-8 xl:w-8" />
        <img src="/images/p5/lunamm.png" alt="" className="h-6 w-6 object-contain xl:h-8 xl:w-8" />
      </div>
    </div>
  );
}

function DecomposerScene() {
  return (
    <div className="mx-auto h-40 w-40 rounded-[42%] bg-[#f8f0d4] p-3 shadow-[0_14px_28px_rgba(120,53,15,0.18)] xl:h-52 xl:w-52">
      <svg viewBox="0 0 260 240" className="h-full w-full" aria-hidden="true">
        <ellipse cx="128" cy="122" rx="108" ry="102" fill="#efe2b6" />
        <ellipse cx="130" cy="190" rx="94" ry="35" fill="#6a4429" />
        <ellipse cx="130" cy="202" rx="104" ry="28" fill="#4b2f1d" />
        <rect x="92" y="145" width="92" height="26" rx="10" fill="#7c5032" />
        <rect x="78" y="156" width="34" height="18" rx="8" fill="#8d5d3b" />
        <g>
          <path d="M92 123 C92 104,114 97,127 109 C138 98,162 104,161 124 C157 140,146 145,128 145 C108 145,95 139,92 123 Z" fill="#d4a174" />
          <rect x="121" y="144" width="14" height="34" rx="7" fill="#f1dfbf" />
        </g>
        <g>
          <path d="M152 101 C153 84,172 78,183 88 C191 80,209 84,211 100 C208 115,197 121,181 121 C166 121,154 115,152 101 Z" fill="#b57b47" />
          <rect x="176" y="120" width="12" height="32" rx="6" fill="#f0dbbb" />
        </g>
        <g>
          <circle cx="72" cy="196" r="20" fill="#f9f2d7" stroke="#8c5d3e" strokeWidth="4" />
          <circle cx="72" cy="196" r="7" fill="#9ad47b" />
          <path d="M60 196h24M72 184v24" stroke="#5a9c52" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g>
          <circle cx="188" cy="196" r="18" fill="#f9f2d7" stroke="#8c5d3e" strokeWidth="4" />
          <path d="M177 191 C182 182,192 182,199 190" fill="none" stroke="#d58bb7" strokeWidth="4" strokeLinecap="round" />
          <path d="M176 202 C183 210,193 209,199 201" fill="none" stroke="#d58bb7" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g fill="#6b4b37">
          <circle cx="55" cy="150" r="4" />
          <circle cx="200" cy="151" r="4" />
          <circle cx="92" cy="183" r="4" />
          <circle cx="168" cy="176" r="4" />
        </g>
      </svg>
    </div>
  );
}

function VisualBadge({ visual }) {
  if (visual.type === "emoji") {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-xl shadow-sm xl:h-11 xl:w-11 xl:text-2xl">
        {visual.value}
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 p-1.5 shadow-sm xl:h-11 xl:w-11">
      <img src={visual.value} alt="" className="h-full w-full object-contain" />
    </div>
  );
}

function SectionVoiceButton({ onClick, label, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#b9d7ef] bg-white/92 text-[#2563eb] shadow-[0_8px_18px_rgba(59,130,246,0.16)] transition hover:-translate-y-0.5 hover:shadow-lg xl:h-10 xl:w-10 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 xl:h-5 xl:w-5" aria-hidden="true">
        <path
          d="M5 10h4l5-4v12l-5-4H5z"
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
        <path
          d="M17 9a5 5 0 0 1 0 6M19.5 7a8 8 0 0 1 0 10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}

function ConsumerCard({ title, examples, visuals, toneClass }) {
  return (
    <div
      className={`w-full max-w-[175px] rounded-[24px] border-[3px] bg-white/92 p-3.5 text-center shadow-lg xl:max-w-[198px] xl:rounded-[28px] xl:p-4 ${toneClass}`}
    >
      <div className="flex justify-center gap-2">
        {visuals.map((visual, index) => (
          <VisualBadge key={`${title}-${index}`} visual={visual} />
        ))}
      </div>
      <h3 className="mt-3 text-lg font-black leading-tight text-slate-900 xl:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-800 xl:text-base xl:leading-7">{examples}</p>
    </div>
  );
}

const CONSUMER_VISUALS = {
  herbivore: [
    { type: "img", value: "/images/p5/non.png" },
    { type: "img", value: "/images/p5/tag.png" },
  ],
  omnivore: [
    { type: "img", value: "/images/p5/ayam.png" },
    { type: "img", value: "/images/p5/pep.png" },
    { type: "img", value: "/images/p5/mu.png" },
  ],
  carnivore: [
    { type: "img", value: "/images/p5/sing.png" },
    { type: "img", value: "/images/p5/snack.png" },
    { type: "img", value: "/images/p5/y.png" },
  ],
};

const VOICE_LANG = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const VOICE_BUTTON_LABEL = {
  th: "เล่นเสียง",
  en: "Play audio",
  ms: "Main audio",
};

const CONTENT = {
  th: {
    title: "สรุปสาระสำคัญ : การถ่ายทอดพลังงานห่วงโซ่อาหาร",
    intro: "โซ่อาหาร คือ ความสัมพันธ์ของสิ่งมีชีวิตโดยการกินต่อกันเป็นทอด ๆ",
    startTitle: 'เริ่มต้นด้วย "ผู้ผลิต" เสมอ',
    startDesc: "ไม่ว่าห่วงโซ่อาหารเส้นตรงของระบบใด จุดแรกในการรับพลังงานเป็นผู้ผลิตเสมอ",
    principleTitle: "หลักการเรียนและการถ่ายทอดพลังงาน",
    examplePrefix: "ตัวอย่าง :",
    exampleItems: [
      { key: "carrot", label: "แครอท", ringClass: "border-lime-500" },
      { key: "rabbit", label: "กระต่าย", ringClass: "border-orange-400" },
      { key: "snake", label: "งู", ringClass: "border-red-500" },
      { key: "eagle", label: "เหยี่ยว", ringClass: "border-amber-500" },
    ],
    directionTitle: "ทิศทางของลูกศร",
    directionDesc: "หัวลูกศรต้องชี้ไปทางผู้กินเสมอ (ผู้ที่ได้รับพลังงาน) เสมอ",
    producerTitle: "ผู้ผลิต",
    producerDesc: "สิ่งมีชีวิตที่สร้างอาหารเองได้ด้วยการสังเคราะห์แสง เช่น พืช หญ้า สาหร่าย",
    consumerTitle: "ผู้บริโภค",
    consumerDesc: "สิ่งมีชีวิตที่สร้างอาหารเองไม่ได้ ต้องกินพืชหรือสัตว์อื่นเพื่อรับพลังงาน",
    consumerCards: [
      {
        id: "herbivore",
        title: "สัตว์กินพืช",
        examples: "หนอน, ตั๊กแตน, วัว, กระต่าย",
        toneClass: "border-[#f7b54a]",
      },
      {
        id: "omnivore",
        title: "สัตว์กินพืชและสัตว์",
        examples: "ไก่, เป็ด, หมู, หมี, ลิง, มนุษย์",
        toneClass: "border-[#ff8352]",
      },
      {
        id: "carnivore",
        title: "สัตว์กินเนื้อ",
        examples: "สิงโต, งู, เสือ, จระเข้, เหยี่ยว",
        toneClass: "border-[#ff5c50]",
      },
    ],
    decomposerTitle: "ผู้ย่อยสลายและผู้กินซาก",
    decomposerDesc: "ช่วยย่อยสลายซากพืชซากสัตว์ให้กลายเป็นแร่ธาตุในดิน เช่น เห็ด รา และแบคทีเรีย",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Key Summary : Energy Transfer in Food Chains",
    intro: "A food chain is the relationship among living things through eating one another in sequence.",
    startTitle: 'Always begin with a "Producer"',
    startDesc: "In every food-chain system, the first source of energy is always the producer.",
    principleTitle: "Principle of Learning and Energy Transfer",
    examplePrefix: "Example :",
    exampleItems: [
      { key: "carrot", label: "Carrot", ringClass: "border-lime-500" },
      { key: "rabbit", label: "Rabbit", ringClass: "border-orange-400" },
      { key: "snake", label: "Snake", ringClass: "border-red-500" },
      { key: "eagle", label: "Eagle", ringClass: "border-amber-500" },
    ],
    directionTitle: "Arrow Direction",
    directionDesc: "The arrow head must always point to the eater, the organism that receives energy.",
    producerTitle: "Producer",
    producerDesc: "Living things that can make their own food by photosynthesis, such as plants, grass, and algae.",
    consumerTitle: "Consumer",
    consumerDesc: "Living things that cannot make their own food and must eat plants or other animals to get energy.",
    consumerCards: [
      {
        id: "herbivore",
        title: "Herbivore",
        examples: "Caterpillar, grasshopper, cow, rabbit",
        toneClass: "border-[#f7b54a]",
      },
      {
        id: "omnivore",
        title: "Omnivore",
        examples: "Chicken, duck, pig, bear, monkey, human",
        toneClass: "border-[#ff8352]",
      },
      {
        id: "carnivore",
        title: "Carnivore",
        examples: "Lion, snake, tiger, crocodile, eagle",
        toneClass: "border-[#ff5c50]",
      },
    ],
    decomposerTitle: "Decomposer and Scavenger",
    decomposerDesc: "They break down dead plants and animals into minerals in the soil, such as mushrooms, fungi, and bacteria.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Ringkasan Utama : Pemindahan Tenaga Rantaian Makanan",
    intro: "Rantai makanan ialah hubungan antara hidupan melalui pemakanan secara berturutan.",
    startTitle: 'Sentiasa bermula dengan "Pengeluar"',
    startDesc: "Dalam setiap sistem rantai makanan, sumber tenaga pertama sentiasa datang daripada pengeluar.",
    principleTitle: "Prinsip Pembelajaran dan Pemindahan Tenaga",
    examplePrefix: "Contoh :",
    exampleItems: [
      { key: "carrot", label: "Lobak", ringClass: "border-lime-500" },
      { key: "rabbit", label: "Arnab", ringClass: "border-orange-400" },
      { key: "snake", label: "Ular", ringClass: "border-red-500" },
      { key: "eagle", label: "Helang", ringClass: "border-amber-500" },
    ],
    directionTitle: "Arah Anak Panah",
    directionDesc: "Kepala anak panah mesti sentiasa menunjuk kepada pemakan, iaitu penerima tenaga.",
    producerTitle: "Pengeluar",
    producerDesc: "Hidupan yang menghasilkan makanan sendiri melalui fotosintesis seperti tumbuhan, rumput dan alga.",
    consumerTitle: "Pengguna",
    consumerDesc: "Hidupan yang tidak dapat menghasilkan makanan sendiri dan perlu memakan tumbuhan atau haiwan lain untuk tenaga.",
    consumerCards: [
      {
        id: "herbivore",
        title: "Herbivor",
        examples: "Ulat, belalang, lembu, arnab",
        toneClass: "border-[#f7b54a]",
      },
      {
        id: "omnivore",
        title: "Omnivor",
        examples: "Ayam, itik, babi, beruang, monyet, manusia",
        toneClass: "border-[#ff8352]",
      },
      {
        id: "carnivore",
        title: "Karnivor",
        examples: "Singa, ular, harimau, buaya, helang",
        toneClass: "border-[#ff5c50]",
      },
    ],
    decomposerTitle: "Pengurai dan Pemakan Bangkai",
    decomposerDesc: "Mereka menguraikan sisa tumbuhan dan haiwan menjadi mineral dalam tanah seperti cendawan, kulat dan bakteria.",
    back: "Kembali",
    next: "Seterusnya",
  },
};

export default function P5FoodChainsss() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");
  const content = CONTENT[activeLang] ?? CONTENT.th;
  const voiceButtonLabel = VOICE_BUTTON_LABEL[activeLang] ?? VOICE_BUTTON_LABEL.th;
  const speakText = (text) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !text) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[activeLang] ?? VOICE_LANG.th;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };
  const exampleText = content.exampleItems.map((item) => item.label).join(" → ");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif] text-slate-900">
      <HomeButton />

      <div className="absolute inset-0 bg-white/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-[#8bc53f] xl:h-16" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1360px] flex-col px-4 pb-6 pt-3 sm:px-6 lg:px-5 lg:pb-8">
        <div className="relative mx-auto max-w-[1050px] rounded-[30px] bg-[#fff7df]/92 px-5 py-3 text-center shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:px-8 xl:rounded-[36px] xl:px-10">
          <SectionVoiceButton
            onClick={() => speakText(`${content.title}. ${content.intro}`)}
            label={voiceButtonLabel}
            className="absolute bottom-3 right-4"
          />
          <h1 className="text-lg font-black tracking-tight text-[#1e1b16] sm:text-3xl lg:text-[1.8rem] xl:text-[2.4rem]">
            {content.title}
          </h1>
          <p className="mt-2 text-sm font-medium text-[#171717] sm:text-lg lg:text-[1.08rem] xl:text-[1.35rem]">
            {content.intro}
          </p>
        </div>

        <div className="mt-3 grid gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-[0.82fr_1.18fr_0.82fr]">
          <div className="space-y-3">
            <div className="relative rounded-[24px] bg-white/82 p-3.5 pb-20 shadow-[0_14px_32px_rgba(34,197,94,0.14)] backdrop-blur-sm xl:rounded-[30px] xl:p-4 xl:pb-20">
              <SectionVoiceButton
                onClick={() => speakText(`${content.startTitle}. ${content.startDesc}`)}
                label={voiceButtonLabel}
                className="absolute bottom-1 right-3 xl:bottom-3 xl:right-4 xl:top-auto"
              />
              <h2 className="text-base font-black text-[#111827] sm:text-lg xl:text-xl">
                {content.startTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-800 xl:text-base xl:leading-7">
                {content.startDesc}
              </p>
            </div>

            <div className="relative rounded-[26px] bg-white/82 p-3.5 text-center shadow-[0_16px_36px_rgba(34,197,94,0.16)] backdrop-blur-sm xl:rounded-[30px] xl:p-4">
              <SectionVoiceButton
                onClick={() => speakText(`${content.producerTitle}. ${content.producerDesc}`)}
                label={voiceButtonLabel}
                className="absolute right-3 top-10 xl:right-4 xl:top-4"
              />
              <ProducerScene />
              <h2 className="mt-3 text-2xl font-black text-[#2ba14b] sm:text-3xl xl:text-[2.2rem]">
                {content.producerTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-900 xl:text-base xl:leading-7">
                {content.producerDesc}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative rounded-[26px] bg-white/82 p-3.5 shadow-[0_16px_36px_rgba(248,113,113,0.16)] backdrop-blur-sm xl:rounded-[30px] xl:p-4">
              <SectionVoiceButton
                onClick={() => speakText(`${content.principleTitle}. ${content.examplePrefix} ${exampleText}`)}
                label={voiceButtonLabel}
                className="absolute right-3 top-12 xl:right-4 xl:top-4"
              />
              <div className="mx-auto w-fit rounded-full bg-[#ff4d43] px-4 py-1.5 text-center text-sm font-black text-white shadow-sm sm:text-lg xl:text-xl">
                {content.principleTitle}
              </div>
              <p className="mt-3 text-center text-sm font-semibold text-slate-900 sm:text-lg lg:text-[1.05rem] xl:text-[1.35rem]">
                {content.examplePrefix} {exampleText}
              </p>
              <div className="mt-4 overflow-x-auto pb-2">
                <div className="mx-auto flex w-max min-w-full flex-nowrap items-start justify-center gap-2 sm:gap-3 xl:gap-4">
                  {content.exampleItems.map((item, index) => (
                    <div key={item.key} className="flex flex-none items-center gap-2 sm:gap-3 xl:gap-4">
                      <ExampleNode label={item.label} kind={item.key} ringClass={item.ringClass} />
                      {index < content.exampleItems.length - 1 && <FlowArrow compact />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-[26px] bg-white/82 p-3.5 shadow-[0_16px_36px_rgba(248,113,113,0.16)] backdrop-blur-sm xl:rounded-[30px] xl:p-4">
              <SectionVoiceButton
                onClick={() => speakText(`${content.consumerTitle}. ${content.consumerDesc}`)}
                label={voiceButtonLabel}
                className="absolute right-3 top-12 xl:right-4 xl:top-4"
              />
              <div className="text-center">
                <h2 className="text-2xl font-black text-[#ff4d43] sm:text-3xl xl:text-[2.2rem]">
                  {content.consumerTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-900 sm:text-lg lg:text-[1.05rem] xl:text-[1.25rem] xl:leading-7">
                  {content.consumerDesc}
                </p>
              </div>

              <div className="mt-3 flex flex-col items-center justify-center gap-2.5 xl:flex-row xl:items-stretch xl:gap-2">
                {content.consumerCards.map((item, index) => (
                  <div key={item.id} className="flex flex-col items-center gap-2 xl:flex-row">
                    <ConsumerCard
                      title={item.title}
                      examples={item.examples}
                      visuals={CONSUMER_VISUALS[item.id]}
                      toneClass={item.toneClass}
                    />
                    {index < content.consumerCards.length - 1 && (
                      <>
                        <div className="xl:hidden">
                          <FlowArrow vertical />
                        </div>
                        <div className="hidden xl:block">
                          <FlowArrow />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative rounded-[24px] bg-white/82 p-3.5 shadow-[0_14px_32px_rgba(180,83,9,0.12)] backdrop-blur-sm xl:rounded-[30px] xl:p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="flex-1 text-left text-base font-black text-[#111827] sm:text-lg xl:text-xl">
                  {content.directionTitle}
                </h2>
                <SectionVoiceButton
                  onClick={() => speakText(`${content.directionTitle}. ${content.directionDesc}`)}
                  label={voiceButtonLabel}
                  className="h-9 w-9 shrink-0 xl:h-10 xl:w-10"
                />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-800 xl:text-base xl:leading-7">
                {content.directionDesc}
              </p>
            </div>

            <div className="relative rounded-[26px] bg-white/82 p-3.5 text-center shadow-[0_16px_36px_rgba(120,53,15,0.15)] backdrop-blur-sm xl:rounded-[30px] xl:p-4">
              <SectionVoiceButton
                onClick={() => speakText(`${content.decomposerTitle}. ${content.decomposerDesc}`)}
                label={voiceButtonLabel}
                className="absolute right-3 top-10 xl:right-4 xl:top-4"
              />
              <DecomposerScene />
              <h2 className="mt-3 text-xl font-black leading-tight text-[#8a4e24] sm:text-3xl xl:text-[2.1rem]">
                {content.decomposerTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-900 xl:text-base xl:leading-7">
                {content.decomposerDesc}
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="fixed bottom-[30px] left-[18px] z-40 max-[720px]:bottom-[20px]">
        <FoodChainLanguageSwitcher
          size="materials"
          value={activeLang}
          onChange={setActiveLang}
          labels={{ th: "ไทย", en: "อังกฤษ", ms: "มลายู" }}
        />
      </div>

      <div className="fixed bottom-[30px] right-[18px] z-40 max-[720px]:bottom-[20px] max-[720px]:right-[12px]">
        <FoodChainNavButtons
          size="materials"
          backLabel={content.back}
          nextLabel={content.next}
          nextArrow={"\u00BB"}
          onBack={() => navigate(-1)}
          onNext={() => navigate("/p5/life")}
        />
      </div>
    </div>
  );
}
