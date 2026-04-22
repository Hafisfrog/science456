import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../HomeButton";
import { FoodChainLanguageSwitcher } from "./FoodChainControls";

const getSlotKey = (row, col) => `${row}-${col}`;
const SCORE_PER_ROW = 2;
const PANEL_CHOICE_COUNT = 4;

const ANSWER_CHAINS = [
  ["ต้นข้าว", "ตั๊กแตน", "กบ", "งู"],
  ["ต้นข้าว", "หนูนา", "งู", "เหยี่ยว"],
  ["หญ้า", "หนอน", "นก", "งู"],
  ["ต้นข้าว", "หนูนา", "นก", "เหยี่ยว"],
  ["พืชน้ำ", "ลูกน้ำ", "ปลา", "นก"],
];

const DEFAULT_LOCKED_SLOT_KEYS = [
  getSlotKey(0, 0),
  getSlotKey(0, 3),
  getSlotKey(1, 1),
  getSlotKey(1, 3),
  getSlotKey(2, 1),
  getSlotKey(2, 2),
  getSlotKey(3, 0),
  getSlotKey(3, 3),
  getSlotKey(4, 1),
  getSlotKey(4, 2),
];

const createQuestionChains = (lockedSet) =>
  ANSWER_CHAINS.map((row, rowIndex) =>
    row.map((name, colIndex) =>
      lockedSet.has(getSlotKey(rowIndex, colIndex)) ? name : ""
    )
  );

const shuffleArray = (items) => {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
  }

  return nextItems;
};

const getRandomLockedSlots = () => {
  const nextLockedSlots = new Set();

  for (let rowIndex = 0; rowIndex < ANSWER_CHAINS.length; rowIndex += 1) {
    const columns = shuffleArray([0, 1, 2, 3]);

    const clueCount = 2;

    for (let index = 0; index < clueCount; index += 1) {
      nextLockedSlots.add(getSlotKey(rowIndex, columns[index]));
    }
  }

  return nextLockedSlots;
};

const CHAIN_ACCENTS = [
  "border-emerald-200 bg-emerald-50 text-emerald-700",
  "border-sky-200 bg-sky-50 text-sky-700",
  "border-amber-200 bg-amber-50 text-amber-700",
  "border-rose-200 bg-rose-50 text-rose-700",
  "border-teal-200 bg-teal-50 text-teal-700",
];

const createEmptyRevealResults = () => ANSWER_CHAINS.map(() => null);

const getRowScore = (rowIndex, row, lockedSet) =>
  row.reduce((score, item, colIndex) => {
    if (lockedSet.has(getSlotKey(rowIndex, colIndex))) {
      return score;
    }

    return score + (item === ANSWER_CHAINS[rowIndex][colIndex] ? 1 : 0);
  }, 0);

const VOICE_LANG = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const UI_COPY = {
  th: {
    languages: { th: "ไทย", en: "อังกฤษ", ms: "มลายู" },
    activityBadge: "กิจกรรมฝึกเรียงลำดับห่วงโซ่อาหาร",
    pageTitle: "สร้างห่วงโซ่อาหารโดยเรียงลำดับการกินของสิ่งมีชีวิต",
    pageDescription:
      "คลิกช่องที่ยังว่างเพื่อเลือกสิ่งมีชีวิตให้ถูกตำแหน่ง จากนั้นตรวจคำตอบต่อในขั้นถัดไปได้เหมือนเดิม",
    legendPrompt: "ช่องสีเทา = ช่องใบ้",
    legendFill: "ช่องสีครีม = ช่องให้เติม",
    legendReveal: "ปุ่มเฉลย = เปิดคำตอบทั้งแถว",
    progressTitle: "ความคืบหน้า",
    progressDesc: "จำนวนช่องที่เติมแล้วจากช่องที่ต้องตอบ",
    clueTitle: "ช่องใบ้เริ่มต้น",
    clueDesc: "จำนวนช่องที่ระบบเปิดคำตอบไว้ให้",
    randomQuestion: "สุ่มโจทย์ใหม่",
    chainLabel: "โซ่อาหาร",
    slotLabel: "ช่องที่",
    slotPrompt: "โจทย์",
    slotSelected: "เลือกแล้ว",
    slotFill: "เติมคำตอบ",
    slotWrong: "ผิด",
    clickToChoose: "คลิกเพื่อเลือก",
    rowComplete: "เติมครบแล้ว",
    rowFilled: (filled, total) => `เติมแล้ว ${filled}/${total} ช่อง`,
    revealRow: "เฉลย",
    listenIntro: "ฟังส่วนบน",
    listenRow: "ฟังแถวนี้",
    rowSpeechLabel: "แถว",
    emptySlotSpeech: "ช่องว่าง",
    answerCorrectAlready: "คำตอบถูกแล้ว",
    correctAnswerLabel: "เฉลยที่ถูกต้อง",
    back: "ย้อนกลับ",
    viewAllAnswers: "เฉลยทั้งหมด",
    chooseLivingThing: "เลือกสิ่งมีชีวิต",
    fillAnswerFor: (chain, slot) => `เติมคำตอบลงใน ${chain} ${slot}`,
    chooseDescription:
      "แตะการ์ดด้านล่างเพื่อใส่คำตอบ หรือเลือกปุ่มลบเพื่อเคลียร์ช่องที่กำลังเลือก",
    close: "ปิด",
    clearAnswer: "ลบคำตอบ",
    clearSlot: "เคลียร์ช่องที่เลือก",
    fillAllAlert: "กรุณาเติมคำตอบให้ครบทุกช่องก่อน",
  },
  en: {
    languages: { th: "Thai", en: "English", ms: "Malay" },
    activityBadge: "Food chain ordering practice",
    pageTitle: "Build food chains by arranging the feeding order",
    pageDescription:
      "Click an empty slot to choose the correct living thing, then continue to check the answers in the next step.",
    legendPrompt: "Gray slot = clue",
    legendFill: "Cream slot = answer slot",
    legendReveal: "Reveal button = show the whole row",
    progressTitle: "Progress",
    progressDesc: "Number of answered slots out of all slots to fill",
    clueTitle: "Starting clues",
    clueDesc: "Number of slots revealed by the system",
    randomQuestion: "Randomize new puzzle",
    chainLabel: "Food Chain",
    slotLabel: "Slot",
    slotPrompt: "Prompt",
    slotSelected: "Selected",
    slotFill: "Fill answer",
    slotWrong: "Wrong",
    clickToChoose: "Click to choose",
    rowComplete: "All filled",
    rowFilled: (filled, total) => `Filled ${filled}/${total} slots`,
    revealRow: "answer",
    listenIntro: "Listen to this section",
    listenRow: "Listen to this row",
    rowSpeechLabel: "Row",
    emptySlotSpeech: "blank",
    answerCorrectAlready: "Your answer is already correct",
    correctAnswerLabel: "Correct answer",
    back: "Back",
    viewAllAnswers: "View all answers",
    chooseLivingThing: "Choose a living thing",
    fillAnswerFor: (chain, slot) => `Fill the answer in ${chain} ${slot}`,
    chooseDescription:
      "Tap a card below to place the answer, or use the clear button to empty the selected slot.",
    close: "Close",
    clearAnswer: "Clear answer",
    clearSlot: "Clear selected slot",
    fillAllAlert: "Please fill every slot before continuing",
  },
  ms: {
    languages: { th: "Thai", en: "English", ms: "Melayu" },
    activityBadge: "Aktiviti susun rantai makanan",
    pageTitle: "Bina rantai makanan mengikut urutan pemakanan",
    pageDescription:
      "Klik slot yang masih kosong untuk memilih hidupan yang betul, kemudian semak jawapan pada langkah seterusnya.",
    legendPrompt: "Slot kelabu = petunjuk",
    legendFill: "Slot krim = isi jawapan",
    legendReveal: "Butang jawapan = tunjuk seluruh baris",
    progressTitle: "Kemajuan",
    progressDesc: "Bilangan slot yang telah diisi daripada semua slot jawapan",
    clueTitle: "Petunjuk awal",
    clueDesc: "Bilangan slot yang dibuka oleh sistem",
    randomQuestion: "Rawak soalan baru",
    chainLabel: "Rantai Makanan",
    slotLabel: "Slot",
    slotPrompt: "Petunjuk",
    slotSelected: "Sudah pilih",
    slotFill: "Isi jawapan",
    slotWrong: "Salah",
    clickToChoose: "Klik untuk pilih",
    rowComplete: "Sudah lengkap",
    rowFilled: (filled, total) => `Diisi ${filled}/${total} slot`,
    revealRow: "Tunjuk jawapan ",
    listenIntro: "Dengar bahagian ini",
    listenRow: "Dengar baris ini",
    rowSpeechLabel: "Baris",
    emptySlotSpeech: "kosong",
    answerCorrectAlready: "Jawapan sudah betul",
    correctAnswerLabel: "Jawapan yang betul",
    back: "Kembali",
    viewAllAnswers: "Lihat semua jawapan",
    chooseLivingThing: "Pilih hidupan",
    fillAnswerFor: (chain, slot) => `Isi jawapan dalam ${chain} ${slot}`,
    chooseDescription:
      "Tekan kad di bawah untuk mengisi jawapan, atau pilih butang padam untuk mengosongkan slot yang dipilih.",
    close: "Tutup",
    clearAnswer: "Padam jawapan",
    clearSlot: "Kosongkan slot dipilih",
    fillAllAlert: "Sila isi semua slot dahulu",
  },
};

const LANGUAGE_BUTTON_LABELS = {
  th: "ไทย",
  en: "อังกฤษ",
  ms: "มลายู",
};

const ANIMAL_TRANSLATIONS = {
  "/images/p5/kaw.png": { en: "Rice Plant", ms: "Pokok Padi" },
  "/images/p5/ya.png": { en: "Grass", ms: "Rumput" },
  "/images/p5/lunamm.png": { en: "Aquatic Plant", ms: "Tumbuhan Air" },
  "/images/p5/tag.png": { en: "Grasshopper", ms: "Belalang" },
  "/images/p5/n.png": { en: "Field Rat", ms: "Tikus Sawah" },
  "/images/p5/non.png": { en: "Caterpillar", ms: "Ulat" },
  "/images/p5/lunam.png": { en: "Larva", ms: "Jentik-jentik" },
  "/images/p5/pla.png": { en: "Fish", ms: "Ikan" },
  "/images/p5/gop.png": { en: "Frog", ms: "Katak" },
  "/images/p5/nog.png": { en: "Bird", ms: "Burung" },
  "/images/p5/snack.png": { en: "Snake", ms: "Ular" },
  "/images/p5/y.png": { en: "Hawk", ms: "Helang" },
};

export default function P5FoodChainSelect() {
  const navigate = useNavigate();
  const animals = [
    { name: "ต้นข้าว", img: "/images/p5/kaw.png", color: "from-amber-300 to-yellow-400" },
    { name: "หญ้า", img: "/images/p5/ya.png", color: "from-lime-300 to-green-400" },
    { name: "พืชน้ำ", img: "/images/p5/lunamm.png", color: "from-emerald-300 to-teal-400" },
    { name: "ตั๊กแตน", img: "/images/p5/tag.png", color: "from-yellow-300 to-amber-400" },
    { name: "หนูนา", img: "/images/p5/n.png", color: "from-orange-300 to-amber-500" },
    { name: "หนอน", img: "/images/p5/non.png", color: "from-red-300 to-rose-400" },
    { name: "ลูกน้ำ", img: "/images/p5/lunam.png", color: "from-cyan-300 to-blue-400" },
    { name: "ปลา", img: "/images/p5/pla.png", color: "from-sky-300 to-indigo-400" },
    { name: "กบ", img: "/images/p5/gop.png", color: "from-lime-300 to-green-500" },
    { name: "นก", img: "/images/p5/nog.png", color: "from-purple-300 to-violet-400" },
    { name: "งู", img: "/images/p5/snack.png", color: "from-emerald-400 to-teal-500" },
    { name: "เหยี่ยว", img: "/images/p5/y.png", color: "from-amber-400 to-orange-500" },
  ];

  const [activeLang, setActiveLang] = useState("th");
  const [lockedSlots, setLockedSlots] = useState(() => new Set(DEFAULT_LOCKED_SLOT_KEYS));
  const [chains, setChains] = useState(() =>
    createQuestionChains(new Set(DEFAULT_LOCKED_SLOT_KEYS))
  );
  const [rowRevealResults, setRowRevealResults] = useState(createEmptyRevealResults);
  const [showPanel, setShowPanel] = useState(false);
  const [activeSlot, setActiveSlot] = useState({ row: null, col: null });
  const [rowChoiceOrders, setRowChoiceOrders] = useState(() =>
    ANSWER_CHAINS.map(() => [])
  );

  const ui = UI_COPY[activeLang] ?? UI_COPY.th;
  const totalScoreTitle =
    activeLang === "en" ? "Total score" : activeLang === "ms" ? "Jumlah markah" : "คะแนนรวม";
  const totalScoreDesc =
    activeLang === "en"
      ? "Each food chain is worth 2 points"
      : activeLang === "ms"
        ? "Setiap rantai makanan bernilai 2 markah"
        : "แต่ละโซ่อาหารมีคะแนนเต็ม 2 คะแนน";
  const rowScoreLabel =
    activeLang === "en" ? "Score" : activeLang === "ms" ? "Markah" : "คะแนน";
  const isLocked = (row, col) => lockedSlots.has(getSlotKey(row, col));
  const getAnimalMeta = (name) => animals.find((animal) => animal.name === name);
  const allAnimalNames = animals.map((animal) => animal.name);

  const buildChoicesForRow = (rowIndex, currentLockedSlots = lockedSlots) => {
    const rowAnswers = ANSWER_CHAINS[rowIndex] ?? [];
    const clueNames = rowAnswers.filter((_, colIndex) =>
      currentLockedSlots.has(getSlotKey(rowIndex, colIndex))
    );
    const answerNamesToFill = rowAnswers.filter(
      (_, colIndex) => !currentLockedSlots.has(getSlotKey(rowIndex, colIndex))
    );
    const excludedNames = new Set(clueNames);
    const distractorCandidates = allAnimalNames.filter(
      (name) => !excludedNames.has(name) && !answerNamesToFill.includes(name)
    );
    const distractors = shuffleArray(distractorCandidates).slice(
      0,
      Math.max(0, PANEL_CHOICE_COUNT - answerNamesToFill.length)
    );

    return shuffleArray([...answerNamesToFill, ...distractors]);
  };

  const getDisplayName = (name) => {
    const animal = getAnimalMeta(name);

    if (!animal) {
      return name;
    }

    return activeLang === "th"
      ? animal.name
      : ANIMAL_TRANSLATIONS[animal.img]?.[activeLang] ?? animal.name;
  };

  const isComplete = chains.every((row) => row.every(Boolean));
  const getChainTitle = (rowIndex) =>
    activeLang === "th" ? `ข้อที่ ${rowIndex + 1}` : `${ui.chainLabel} ${rowIndex + 1}`;
  const translatedActiveSlotSummary =
    activeSlot.row !== null && activeSlot.col !== null
      ? `${getChainTitle(activeSlot.row)} ${ui.slotLabel} ${activeSlot.col + 1}`
      : "";
  const activeSlotHeading =
    activeSlot.row !== null && activeSlot.col !== null
      ? ui.fillAnswerFor(
          getChainTitle(activeSlot.row),
          `${ui.slotLabel} ${activeSlot.col + 1}`
        )
      : "";
  const activeRowChoices =
    activeSlot.row !== null
      ? (rowChoiceOrders[activeSlot.row] ?? [])
          .map((name) => getAnimalMeta(name))
          .filter(Boolean)
      : [];
  const totalScore = chains.reduce(
    (score, row, rowIndex) => score + getRowScore(rowIndex, row, lockedSlots),
    0
  );
  const totalPossibleScore = ANSWER_CHAINS.length * SCORE_PER_ROW;

  const speakText = (text) => {
    try {
      if (typeof window === "undefined" || !text || !window.speechSynthesis) {
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = VOICE_LANG[activeLang] ?? VOICE_LANG.th;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech issues on unsupported browsers.
    }
  };

  const handleSpeakRow = (rowIndex) => {
    const row = chains[rowIndex];

    if (!row) {
      return;
    }

    speakText(
      `${ui.rowSpeechLabel} ${rowIndex + 1}: ${row
        .map((name) => (name ? getDisplayName(name) : ui.emptySlotSpeech))
        .join(", ")}`
    );
  };

  const handleSpeakIntro = () => {
    speakText([ui.activityBadge, ui.pageTitle, ui.pageDescription].join(". "));
  };

  const clearRevealForRow = (rowIndexToClear) => {
    setRowRevealResults((prev) =>
      prev.map((result, rowIndex) => (rowIndex === rowIndexToClear ? null : result))
    );
  };

  const handleSlotClick = (row, col) => {
    if (isLocked(row, col)) {
      return;
    }

    setRowChoiceOrders((prev) =>
      prev.map((choiceRow, rowIndex) =>
        rowIndex === row ? buildChoicesForRow(row) : choiceRow
      )
    );
    setActiveSlot({ row, col });
    setShowPanel(true);
  };

  const handleSelectAnimal = (animal) => {
    if (activeSlot.row === null || activeSlot.col === null) {
      return;
    }

    clearRevealForRow(activeSlot.row);
    setChains((prev) =>
      prev.map((row, rowIndex) =>
        row.map((item, colIndex) =>
          rowIndex === activeSlot.row && colIndex === activeSlot.col ? animal.name : item
        )
      )
    );
    setShowPanel(false);
  };

  const handleClearActiveSlot = () => {
    if (activeSlot.row === null || activeSlot.col === null) {
      return;
    }

    clearRevealForRow(activeSlot.row);
    setChains((prev) =>
      prev.map((row, rowIndex) =>
        row.map((item, colIndex) =>
          rowIndex === activeSlot.row && colIndex === activeSlot.col ? "" : item
        )
      )
    );
    setShowPanel(false);
  };

  const handleRandomQuestion = () => {
    const nextLockedSlots = getRandomLockedSlots();
    setLockedSlots(nextLockedSlots);
    setChains(createQuestionChains(nextLockedSlots));
    setRowRevealResults(createEmptyRevealResults());
    setRowChoiceOrders(
      ANSWER_CHAINS.map((_, rowIndex) => buildChoicesForRow(rowIndex, nextLockedSlots))
    );
    setShowPanel(false);
    setActiveSlot({ row: null, col: null });
  };

  const handleRevealRowAnswer = (rowIndex) => {
    if (!chains[rowIndex] || chains[rowIndex].some((item) => !item)) {
      return;
    }

    const alreadyCorrect = chains[rowIndex].every(
      (item, colIndex) => item === ANSWER_CHAINS[rowIndex][colIndex]
    );

    const revealResult = alreadyCorrect
      ? { alreadyCorrect: true }
      : {
          alreadyCorrect: false,
          slots: chains[rowIndex].map((item, colIndex) => ({
            status:
              isLocked(rowIndex, colIndex) || item === ANSWER_CHAINS[rowIndex][colIndex]
                ? "correct"
                : "incorrect",
          })),
          answerChain: [...ANSWER_CHAINS[rowIndex]],
        };

    setRowRevealResults((prev) =>
      prev.map((result, index) => (index === rowIndex ? revealResult : result))
    );
    setShowPanel(false);
  };

  const handleGoToAnswers = () => {
    if (!isComplete) {
      window.alert(ui.fillAllAlert);
      return;
    }

    navigate("/p5/life/foodchain/sim", {
      state: { chains, lockedSlots: Array.from(lockedSlots) },
    });
  };

  const getImage = (name) => {
    const animal = animals.find((item) => item.name === name);
    return animal ? animal.img : "";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/images/p5/back.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif]">
      <HomeButton />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 via-white/45 to-emerald-50/50" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-8 top-6 h-40 w-40 rounded-full bg-lime-100/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-amber-100/28 blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-56 w-56 rounded-full bg-cyan-100/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-emerald-100/26 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-3.5 pb-7 pt-3.5 sm:px-5 lg:px-7">
        <div className="rounded-[22px] border border-emerald-100/80 bg-white/86 p-4 shadow-[0_6px_16px_rgba(148,163,184,0.11)] backdrop-blur-sm sm:p-5 lg:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center xl:gap-5">
            <div className="space-y-3.5">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div className="inline-flex items-center rounded-full border border-emerald-100/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_4px_12px_rgba(148,163,184,0.1)]">
                  {ui.activityBadge}
                </div>

                <button
                  type="button"
                  onClick={handleSpeakIntro}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sky-200/85 bg-[#dcecff] text-lg text-blue-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#cfe4ff] sm:h-12 sm:w-12"
                  aria-label={ui.listenIntro}
                  title={ui.listenIntro}
                >
                  {"\uD83D\uDD0A"}
                </button>
              </div>

              <div>
                <h1 className="max-w-3xl text-[1.5rem] font-semibold leading-[1.22] tracking-[-0.01em] text-slate-600 sm:text-[1.75rem] lg:text-[1.95rem]">
                  {ui.pageTitle}
                </h1>
                <p className="mt-2.5 max-w-3xl text-sm leading-6 text-slate-600 sm:text-[0.95rem]">
                  {ui.pageDescription}
                </p>
                <div className="mt-3 h-px w-full max-w-lg bg-gradient-to-r from-emerald-200/70 via-slate-200/60 to-transparent" />
              </div>
            </div>

            <div className="bg-transparent p-0">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleRandomQuestion}
                  className="relative inline-flex aspect-square w-full max-w-[8.6rem] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[28px] border-2 border-emerald-200 bg-gradient-to-br from-[#ebf8f2] via-[#dff3e8] to-[#cfeadf] px-2 text-center text-[0.78rem] font-bold text-emerald-900 shadow-[0_9px_16px_rgba(52,123,98,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_11px_18px_rgba(52,123,98,0.24)] sm:max-w-[9.3rem] sm:text-sm"
                >
                  <span className="pointer-events-none absolute left-2 top-2 h-4 w-9 rotate-[-22deg] rounded-full bg-white/65 blur-[0.2px]" />
                  <span className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-8 rotate-[-22deg] rounded-full bg-white/45 blur-[0.2px]" />
                  <span className="pointer-events-none absolute inset-[17%] rounded-[20px] border-[3px] border-emerald-300/90 bg-gradient-to-b from-[#bfe3d1] to-[#a8d6c0] shadow-inner" />

                  <span className="relative z-10 text-xl sm:text-2xl">{"\uD83C\uDFB2"}</span>
                  <span className="relative z-10 leading-tight">{ui.randomQuestion}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3.5">
          {chains.map((row, rowIndex) => {
            const editableCount = row.filter((_, colIndex) => !isLocked(rowIndex, colIndex)).length;
            const filledCount = row.filter(
              (item, colIndex) => !isLocked(rowIndex, colIndex) && item
            ).length;
            const isRowComplete = row.every(Boolean);
            const rowScore = getRowScore(rowIndex, row, lockedSlots);
            const accent = CHAIN_ACCENTS[rowIndex % CHAIN_ACCENTS.length];
            const rowRevealResult = rowRevealResults[rowIndex];
            const hasRowReveal = Boolean(rowRevealResult);

            return (
              <div
                key={rowIndex}
                className="rounded-[22px] border border-emerald-100/80 bg-white/88 p-3.5 shadow-[0_8px_20px_rgba(148,163,184,0.1)] backdrop-blur-sm sm:p-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2.5">
                    <div
                      className={`inline-flex w-fit items-center rounded-full border px-4 py-1.5 text-sm font-semibold shadow-sm ${accent}`}
                    >
                      {getChainTitle(rowIndex)}
                    </div>

                    {hasRowReveal && (
                      <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                        {rowScoreLabel} {rowScore}/{SCORE_PER_ROW}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2.5">
                    {row.map((item, colIndex) => {
                      const locked = isLocked(rowIndex, colIndex);
                      const slotRevealResult = rowRevealResult?.slots?.[colIndex] ?? null;
                      const slotCardClass = locked
                        ? "cursor-default border-slate-200/90 bg-white shadow-sm"
                        : slotRevealResult?.status === "incorrect"
                          ? "border-rose-200/90 bg-rose-50/75 hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-[0_10px_20px_rgba(244,63,94,0.12)]"
                          : item
                            ? "border-emerald-200/90 bg-emerald-50/70 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_10px_20px_rgba(16,185,129,0.12)]"
                            : "border-amber-200/90 bg-amber-50/70 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-[0_10px_20px_rgba(245,158,11,0.12)]";
                      const slotBadgeClass = locked
                        ? "bg-slate-100 text-slate-600"
                        : slotRevealResult?.status === "incorrect"
                          ? "bg-rose-100 text-rose-600"
                          : item
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600";
                      const slotBadgeText = locked
                        ? ui.slotPrompt
                        : slotRevealResult?.status === "incorrect"
                          ? ui.slotWrong
                          : item
                            ? ui.slotSelected
                            : ui.slotFill;

                      return (
                        <div key={colIndex} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSlotClick(rowIndex, colIndex)}
                            aria-disabled={locked}
                            title={slotBadgeText}
                            className={`group relative flex h-32 w-[10.5rem] flex-col items-center justify-center overflow-hidden rounded-[20px] border text-center transition duration-200 sm:h-36 sm:w-[12rem] ${slotCardClass}`}
                          >
                            <div
                              className={`absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${slotBadgeClass}`}
                            >
                              {slotBadgeText}
                            </div>

                            {item ? (
                              <div className="flex h-full w-full flex-col justify-between px-3 pb-3 pt-8">
                                <div className="flex flex-1 items-center justify-center">
                                  <img
                                    src={getImage(item)}
                                    className="mx-auto h-[6rem] w-[6rem] object-contain drop-shadow-[0_8px_14px_rgba(15,23,42,0.12)] sm:h-[7rem] sm:w-[7rem]"
                                    alt={getDisplayName(item)}
                                  />
                                </div>
                                <div className="mt-1.5 text-sm font-semibold leading-tight text-slate-700 sm:text-[0.95rem]">
                                  {getDisplayName(item)}
                                </div>
                              </div>
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 px-2 pt-6 text-center">
                                <div className="flex items-center justify-center">
                                  <div className="mx-auto flex h-[5.3rem] w-[5.3rem] items-center justify-center rounded-full bg-white text-[2.8rem] text-amber-500 shadow-inner sm:h-[6rem] sm:w-[6rem] sm:text-[3rem]">
                                    +
                                  </div>
                                </div>
                                <div className="max-w-[92%] text-sm font-semibold leading-tight text-amber-500">
                                  {ui.clickToChoose}
                                </div>
                              </div>
                            )}
                          </button>

                          {colIndex < row.length - 1 && (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200/85 bg-white text-lg font-black text-emerald-600 shadow-sm">
                              {"\u2192"}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                      <div
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          isRowComplete
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isRowComplete ? ui.rowComplete : ui.rowFilled(filledCount, editableCount)}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSpeakRow(rowIndex)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-200/85 bg-white text-base text-sky-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50"
                        aria-label={ui.listenRow}
                        title={ui.listenRow}
                      >
                        {"\uD83D\uDD0A"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRevealRowAnswer(rowIndex)}
                        disabled={!isRowComplete}
                        className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold shadow-sm transition duration-200 sm:text-sm ${
                          isRowComplete
                            ? "border-sky-200/85 bg-white text-sky-700 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50"
                            : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-80"
                        }`}
                      >
                        {ui.revealRow}
                      </button>
                    </div>
                  </div>

                  {rowRevealResult && (
                    <div
                      className={`rounded-[16px] border px-3.5 py-3 text-sm font-medium 2xl:basis-full ${
                        rowRevealResult.alreadyCorrect
                          ? "border-emerald-200 bg-emerald-50/80 text-emerald-700"
                          : "border-sky-200 bg-sky-50/70 text-sky-700"
                      }`}
                    >
                      {rowRevealResult.alreadyCorrect ? (
                        ui.answerCorrectAlready
                      ) : (
                        <div className="space-y-3">
                          <div className="inline-flex w-fit rounded-full border border-sky-200 bg-white px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-sky-700">
                            {ui.correctAnswerLabel}
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5">
                            {rowRevealResult.answerChain.map((answerName, answerIndex) => (
                              <div
                                key={`${rowIndex}-answer-${answerIndex}`}
                                className="flex items-center gap-2.5"
                              >
                                <div className="flex h-24 w-[7.75rem] flex-col items-center justify-center rounded-[16px] border border-sky-200/90 bg-white px-2 text-center shadow-sm sm:h-28 sm:w-[9rem]">
                                  <img
                                    src={getImage(answerName)}
                                    alt={getDisplayName(answerName)}
                                    className="mx-auto h-12 w-12 object-contain drop-shadow-[0_6px_12px_rgba(15,23,42,0.1)] sm:h-14 sm:w-14"
                                  />
                                  <div className="mt-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                                    {getDisplayName(answerName)}
                                  </div>
                                </div>

                                {answerIndex < rowRevealResult.answerChain.length - 1 && (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/85 bg-white text-base font-black text-sky-700 shadow-sm">
                                    {"\u2192"}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pb-40 sm:pb-24" />
      </div>

      <div className="fixed bottom-[18px] left-[18px] z-40">
        <FoodChainLanguageSwitcher
          size="materials"
          value={activeLang}
          onChange={setActiveLang}
          labels={LANGUAGE_BUTTON_LABELS}
        />
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-40 flex items-center gap-3 max-[720px]:bottom-[12px] max-[720px]:right-[12px] max-[720px]:gap-2">
        <button
          className="rounded-[18px] bg-white/92 px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-slate-900 shadow-[0_22px_46px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_56px_rgba(0,0,0,.26)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={() => navigate("/p5/life/foodchain/steps")}
          type="button"
        >
          {"\u00AB"} {ui.back}
        </button>

        <button
          className="rounded-[18px] bg-[#08c95a] px-[18px] py-[14px] text-[20px] font-['Prompt',sans-serif] font-black text-white shadow-[0_22px_46px_rgba(8,201,90,.24)] transition hover:-translate-y-0.5 hover:bg-[#07b351] hover:shadow-[0_28px_56px_rgba(8,201,90,.30)] active:translate-y-[1px] max-[720px]:rounded-[16px] max-[720px]:px-[16px] max-[720px]:py-[12px] max-[720px]:text-[18px]"
          onClick={handleGoToAnswers}
          type="button"
        >
          {ui.viewAllAnswers} {"\u00BB"}
        </button>
      </div>

      {showPanel && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/20 p-4 backdrop-blur-[2px] sm:p-6"
          onClick={() => setShowPanel(false)}
        >
          <div
            className="flex min-h-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              data-slot-summary={translatedActiveSlotSummary}
              className="w-full max-w-4xl rounded-[22px] border border-emerald-100/80 bg-white/95 p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.15)] backdrop-blur-sm sm:p-5"
            >
              <div className="flex flex-col gap-2.5 border-b border-slate-200/80 pb-3.5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                    {ui.chooseLivingThing}
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-slate-800 sm:text-xl">
                    {activeSlotHeading}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    {ui.chooseDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPanel(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
                >
                  {ui.close}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <button
                  type="button"
                  onClick={handleClearActiveSlot}
                  className="flex aspect-square flex-col items-center justify-center rounded-[16px] border border-red-200 bg-red-50/90 p-2.5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-[0_8px_16px_rgba(244,63,94,0.14)]"
                >
                  <span className="mb-1.5 text-2xl">{"\uD83D\uDDD1"}</span>
                  <span className="text-xs font-semibold text-red-600 sm:text-sm">{ui.clearAnswer}</span>
                  <span className="mt-0.5 text-[0.68rem] text-red-500 sm:text-xs">{ui.clearSlot}</span>
                </button>

                {activeRowChoices.map((animal) => (
                  <button
                    key={animal.name}
                    type="button"
                    onClick={() => handleSelectAnimal(animal)}
                    className="group relative aspect-square overflow-hidden rounded-[16px] border border-emerald-200/90 bg-white p-2.5 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_8px_18px_rgba(16,185,129,0.14)]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-[0.12] ${animal.color}`} />
                    <div className="relative flex h-full w-full flex-col items-center justify-center">
                      <div className="flex h-[64%] w-full items-center justify-center rounded-[12px] bg-white/70 p-1">
                        <img
                          src={animal.img}
                          className="mx-auto h-16 w-16 object-contain drop-shadow-[0_7px_12px_rgba(15,23,42,0.12)] transition duration-200 group-hover:scale-105 sm:h-20 sm:w-20"
                          alt={getDisplayName(animal.name)}
                        />
                      </div>
                      <span className="mt-1.5 text-[0.68rem] font-semibold text-slate-700 sm:text-xs">
                        {getDisplayName(animal.name)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
