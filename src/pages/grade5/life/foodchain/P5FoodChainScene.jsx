import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

const VOICE_LANG = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

const UI_COPY = {
  th: {
    listenAll: "ฟังทั้งหมด",
    listenOne: "เล่นเสียง",
    back: "ย้อนกลับ",
    next: "ไปต่อ",
    languages: {
      th: "ไทย",
      en: "อังกฤษ",
      ms: "มลายู",
    },
  },
  en: {
    listenAll: "Listen all",
    listenOne: "Play audio",
    back: "Back",
    next: "Next",
    languages: {
      th: "Thai",
      en: "English",
      ms: "Malay",
    },
  },
  ms: {
    listenAll: "Dengar semua",
    listenOne: "Main audio",
    back: "Kembali",
    next: "Seterusnya",
    languages: {
      th: "Thai",
      en: "Inggeris",
      ms: "Melayu",
    },
  },
};

const SCENE_ITEMS = [
  {
    key: "hawk",
    role: "consumer",
    img: "/images/p5/y.png",
    label: {
      th: "เหยี่ยว / ผู้บริโภค",
      en: "Hawk / Consumer",
      ms: "Helang / Pengguna",
    },
    containerClass: "top-[6%] left-[15%]",
    imageClass: "w-28 sm:w-32 lg:w-36",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[7.4rem] lg:max-w-[8.2rem]",
    depthClass: "z-40",
  },
  {
    key: "bird",
    role: "consumer",
    img: "/images/p5/nog.png",
    label: {
      th: "นก / ผู้บริโภค",
      en: "Bird / Consumer",
      ms: "Burung / Pengguna",
    },
    containerClass: "top-[23%] right-[8%]",
    imageClass: "w-[4.4rem] sm:w-[5.2rem] lg:w-24",
    badgeWidthClass: "max-w-[6.2rem] lg:max-w-[7rem]",
    depthClass: "z-40",
  },
  {
    key: "rice",
    role: "producer",
    img: "/images/p5/kaw.png",
    label: {
      th: "ต้นข้าว / ผู้ผลิต",
      en: "Rice Plant / Producer",
      ms: "Pokok Padi / Pengeluar",
    },
    containerClass: "top-[29%] left-[2%]",
    imageClass: "w-28 sm:w-32 lg:w-36",
    badgeWidthClass: "max-w-[7.8rem] lg:max-w-[8.8rem]",
    depthClass: "z-30",
  },
  {
    key: "worm",
    role: "consumer",
    img: "/images/p5/non.png",
    label: {
      th: "หนอน / ผู้บริโภค",
      en: "Caterpillar / Consumer",
      ms: "Ulat / Pengguna",
    },
    containerClass: "top-[45%] left-[20%]",
    imageClass: "w-[4.6rem] sm:w-[5.4rem] lg:w-24",
    transformClass: "rotate-6",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[7.6rem]",
    depthClass: "z-30",
  },
  {
    key: "rat",
    role: "consumer",
    img: "/images/p5/n.png",
    label: {
      th: "หนูนา / ผู้บริโภค",
      en: "Field Rat / Consumer",
      ms: "Tikus Sawah / Pengguna",
    },
    containerClass: "top-[20%] left-[48%]",
    imageClass: "w-20 sm:w-24 lg:w-28",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[8rem]",
    depthClass: "z-30",
  },
  {
    key: "snake",
    role: "consumer",
    img: "/images/p5/snack.png",
    label: {
      th: "งู / ผู้บริโภค",
      en: "Snake / Consumer",
      ms: "Ular / Pengguna",
    },
    containerClass: "top-[48%] left-[39%]",
    imageClass: "w-28 sm:w-32 lg:w-36",
    transformClass: "-rotate-2",
    badgeWidthClass: "max-w-[6.4rem] lg:max-w-[7rem]",
    depthClass: "z-30",
  },
  {
    key: "grass",
    role: "producer",
    img: "/images/p5/ya.png",
    label: {
      th: "หญ้า / ผู้ผลิต",
      en: "Grass / Producer",
      ms: "Rumput / Pengeluar",
    },
    containerClass: "top-[72%] left-[23%]",
    imageClass: "w-[5.4rem] sm:w-24 lg:w-28",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-20",
  },
  {
    key: "grasshopper",
    role: "consumer",
    img: "/images/p5/tag.png",
    label: {
      th: "ตั๊กแตน / ผู้บริโภค",
      en: "Grasshopper / Consumer",
      ms: "Belalang / Pengguna",
    },
    containerClass: "top-[39%] left-[68%]",
    imageClass: "w-[5rem] sm:w-[5.8rem] lg:w-[6.6rem]",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[7.8rem]",
    depthClass: "z-30",
  },
  {
    key: "frog",
    role: "consumer",
    img: "/images/p5/gop.png",
    label: {
      th: "กบ / ผู้บริโภค",
      en: "Frog / Consumer",
      ms: "Katak / Pengguna",
    },
    containerClass: "top-[76%] left-[55%]",
    imageClass: "w-24 sm:w-28 lg:w-32",
    transformClass: "-rotate-6",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-40",
  },
  {
    key: "larva",
    role: "consumer",
    img: "/images/p5/lunam.png",
    label: {
      th: "ลูกน้ำ / ผู้บริโภค",
      en: "Larva / Consumer",
      ms: "Jentik-jentik / Pengguna",
    },
    containerClass: "top-[64%] left-[67%]",
    imageClass: "w-11 sm:w-12 lg:w-14",
    transformClass: "-rotate-12",
    badgeWidthClass: "max-w-[6.8rem] lg:max-w-[7.6rem]",
    depthClass: "z-20",
  },
  {
    key: "water-plant",
    role: "producer",
    img: "/images/p5/lunamm.png",
    label: {
      th: "พืชน้ำ / ผู้ผลิต",
      en: "Aquatic Plant / Producer",
      ms: "Tumbuhan Air / Pengeluar",
    },
    containerClass: "top-[79%] left-[43%]",
    imageClass: "w-24 sm:w-28 lg:w-32",
    badgeWidthClass: "max-w-[7rem] lg:max-w-[8rem]",
    depthClass: "z-20",
  },
  {
    key: "fish",
    role: "consumer",
    img: "/images/p5/pla.png",
    label: {
      th: "ปลา / ผู้บริโภค",
      en: "Fish / Consumer",
      ms: "Ikan / Pengguna",
    },
    containerClass: "top-[57%] right-[9%]",
    imageClass: "w-24 sm:w-28 lg:w-32",
    transformClass: "-scale-x-100",
    badgeWidthClass: "max-w-[6rem] lg:max-w-[6.8rem]",
    depthClass: "z-20",
  },
];

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

function SceneItem({
  item,
  activeLang,
  onSpeak,
  voiceLabel,
  offset,
  isDragging,
  onDragStart,
  onDragMove,
  onDragEnd,
}) {
  const label = item.label[activeLang] ?? item.label.th;
  const badgeTone =
    item.role === "producer"
      ? "border-emerald-200/90 bg-white/78"
      : "border-slate-200/90 bg-white/82";

  return (
    <div
      className={`absolute ${item.containerClass} ${isDragging ? "z-[80] cursor-grabbing" : `${item.depthClass ?? "z-20"} cursor-grab`} flex flex-col items-center gap-1 select-none touch-none`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isDragging ? "none" : "transform 140ms ease-out",
      }}
      onPointerDown={(event) => onDragStart(item.key, event)}
      onPointerMove={(event) => onDragMove(item.key, event)}
      onPointerUp={(event) => onDragEnd(item.key, event)}
      onPointerCancel={(event) => onDragEnd(item.key, event)}
      aria-grabbed={isDragging}
    >
      <div className="relative">
        <img
          src={item.img}
          alt={label}
          draggable="false"
          className={`${item.imageClass} ${item.transformClass ?? ""} ${item.role === "consumer" ? "scale-[1.22] sm:scale-[1.26]" : "scale-[1.1] sm:scale-[1.14]"} select-none object-contain drop-shadow-[0_10px_16px_rgba(15,23,42,0.18)]`}
        />

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onSpeak(label);
          }}
          aria-label={`${voiceLabel}: ${label}`}
          className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/80 bg-[#eaf3ff]/95 text-[10px] text-[#2563eb] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#dcecff]"
        >
          {"\uD83D\uDD0A"}
        </button>
      </div>

      <div
        className={`rounded-[15px] border px-2 py-0.5 text-center shadow-[0_8px_20px_rgba(148,163,184,0.14)] backdrop-blur-sm ${badgeTone} ${item.badgeWidthClass}`}
      >
        <span className="block text-[9px] font-medium leading-tight text-slate-700 sm:text-[10px]">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function P5FoodChainScene() {
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const dragStateRef = useRef(null);
  const [activeLang, setActiveLang] = useState("th");
  const [draggingKey, setDraggingKey] = useState(null);
  const [itemOffsets, setItemOffsets] = useState(() =>
    Object.fromEntries(SCENE_ITEMS.map((item) => [item.key, { x: 0, y: 0 }]))
  );

  const ui = UI_COPY[activeLang] ?? UI_COPY.th;
  const dragHintText =
    activeLang === "en"
      ? "Drag each picture to place it yourself."
      : activeLang === "ms"
        ? "Seret gambar untuk susun kedudukan sendiri."
        : "ลากรูปด้วยเมาส์เพื่อจัดตำแหน่งเอง";

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
      // ignore speech issues on unsupported browsers
    }
  };

  const speakAll = () => {
    speakText(SCENE_ITEMS.map((item) => item.label[activeLang] ?? item.label.th).join(". "));
  };

  const handleDragStart = (itemKey, event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const stageRect = stageRef.current?.getBoundingClientRect();
    const itemRect = event.currentTarget.getBoundingClientRect();
    const currentOffset = itemOffsets[itemKey] ?? { x: 0, y: 0 };

    dragStateRef.current = {
      key: itemKey,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: currentOffset,
      startLeft: stageRect ? itemRect.left - stageRect.left : 0,
      startTop: stageRect ? itemRect.top - stageRect.top : 0,
      maxLeft: stageRect ? Math.max(0, stageRect.width - itemRect.width) : Number.POSITIVE_INFINITY,
      maxTop: stageRect ? Math.max(0, stageRect.height - itemRect.height) : Number.POSITIVE_INFINITY,
    };

    setDraggingKey(itemKey);
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleDragMove = (itemKey, event) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.key !== itemKey || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    const nextLeft = clampValue(dragState.startLeft + deltaX, 0, dragState.maxLeft);
    const nextTop = clampValue(dragState.startTop + deltaY, 0, dragState.maxTop);
    const nextOffset = {
      x: dragState.origin.x + (nextLeft - dragState.startLeft),
      y: dragState.origin.y + (nextTop - dragState.startTop),
    };

    setItemOffsets((currentOffsets) => {
      const currentOffset = currentOffsets[itemKey] ?? { x: 0, y: 0 };

      if (currentOffset.x === nextOffset.x && currentOffset.y === nextOffset.y) {
        return currentOffsets;
      }

      return {
        ...currentOffsets,
        [itemKey]: nextOffset,
      };
    });
  };

  const handleDragEnd = (itemKey, event) => {
    const dragState = dragStateRef.current;

    if (!dragState || dragState.key !== itemKey || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setDraggingKey((currentKey) => (currentKey === itemKey ? null : currentKey));
  };

  return (
    <div
      ref={stageRef}
      className="relative h-screen w-screen overflow-hidden bg-[url('/images/p5/fos.png')] bg-cover bg-center bg-no-repeat font-['Prompt',sans-serif] text-slate-900"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08)_58%,rgba(255,255,255,0.03))]" />

      <div className="absolute left-1/2 top-3 z-50 max-w-[min(80vw,22rem)] -translate-x-1/2 rounded-full bg-white/78 px-4 py-2 text-center text-[10px] font-semibold text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.14)] backdrop-blur-sm sm:text-xs">
        {dragHintText}
      </div>

      <div className="absolute bottom-3 left-3 z-50 sm:bottom-4 sm:left-4">
        <FoodChainLanguageSwitcher
          value={activeLang}
          onChange={setActiveLang}
          labels={ui.languages}
        />
      </div>

      <button
        type="button"
        onClick={speakAll}
        className="absolute right-3 top-3 z-50 inline-flex items-center gap-2 rounded-full bg-white/78 px-3 py-2 text-xs font-bold text-[#2563eb] shadow-[0_10px_24px_rgba(59,130,246,0.14)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white sm:right-4 sm:top-4"
        aria-label={ui.listenAll}
      >
        <span>{"\uD83D\uDD0A"}</span>
        <span>{ui.listenAll}</span>
      </button>

      {SCENE_ITEMS.map((item) => (
        <SceneItem
          key={item.key}
          item={item}
          activeLang={activeLang}
          onSpeak={speakText}
          voiceLabel={ui.listenOne}
          offset={itemOffsets[item.key] ?? { x: 0, y: 0 }}
          isDragging={draggingKey === item.key}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      ))}

      <div className="absolute bottom-3 right-3 z-50 sm:bottom-4 sm:right-4">
        <FoodChainNavButtons
          backLabel={ui.back}
          nextLabel={ui.next}
          onBack={() => navigate("/p5/life/foodchain/vocab")}
          onNext={() => navigate("/p5/life/foodchain/materials")}
        />
      </div>
    </div>
  );
}
