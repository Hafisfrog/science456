﻿import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./P4.css";

const VOICE_MAP = {
  th: "th-TH",
  en: "en-US",
  ms: "ms-MY",
};

function speakText(text, lang) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;

  window.speechSynthesis.speak(utterance);
}

export default function P4() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("th");

  const copy = useMemo(
    () => ({
      th: {
        title: "วิทยาศาสตร์ ป.4",
        subtitle: "เลือกหน่วยการเรียนรู้",
        home: "หน้าเลือกชั้นเรียน",
        back: "ย้อนกลับ",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        cards: [
          {
            title: "แรงโน้มถ่วงของโลก",
            image: "/images/p4/gravity.jpg",
            alt: "แรงโน้มถ่วงของโลก",
            onClick: () => navigate("/p4/gravity/objectives"),
          },
          {
            title: "ตัวกลางของแสง",
            image: "/images/p4/light.jpg",
            alt: "ตัวกลางของแสง",
            onClick: () => navigate("/p4/light/objective"),
          },
        ],
      },
      en: {
        title: "Science Grade 4",
        subtitle: "Choose a learning unit",
        home: "Select grade",
        back: "Back",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        cards: [
          {
            title: "Earth's Gravity",
            image: "/images/p4/gravity.jpg",
            alt: "Earth's Gravity",
            onClick: () => navigate("/p4/gravity/objectives"),
          },
          {
            title: "Medium of Light",
            image: "/images/p4/light.jpg",
            alt: "Medium of Light",
            onClick: () => navigate("/p4/light/objective"),
          },
        ],
      },
      ms: {
        title: "Sains Tahun 4",
        subtitle: "Pilih unit pembelajaran",
        home: "Pilih tahun",
        back: "Kembali",
        chipTh: "ไทย",
        chipEn: "อังกฤษ",
        chipMs: "มลายู",
        cards: [
          {
            title: "Graviti Bumi",
            image: "/images/p4/gravity.jpg",
            alt: "Graviti Bumi",
            onClick: () => navigate("/p4/gravity/objectives"),
          },
          {
            title: "Medium Cahaya",
            image: "/images/p4/light.jpg",
            alt: "Medium Cahaya",
            onClick: () => navigate("/p4/light/objective"),
          },
        ],
      },
    }),
    [navigate]
  );

  const t = copy[lang];

  return (
    <div className="p4-page">
      <img
        src="/images/backgroundss.jpg"
        alt="Laboratory background"
        className="p4-bg absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.9]"
      />

      <button
        type="button"
        className="p4-home-btn"
        onClick={() => navigate("/grades")}
        aria-label={t.home}
        title={t.home}
      >
        <svg
          aria-hidden="true"
          className="p4-home-icon"
          viewBox="0 0 128 128"
          focusable="false"
        >
          <path
            className="p4-home-roof"
            d="M13 65.5 57.8 28.2c3.7-3.1 8.7-3.1 12.4 0L115 65.5"
          />
          <path
            className="p4-home-body"
            d="M27.5 69.4 58.3 43.8c3.4-2.8 8-2.8 11.4 0l30.8 25.6v34.8c0 6.5-5.3 11.8-11.8 11.8H76.8V88.4c0-4.7-3.8-8.4-8.4-8.4h-8.8c-4.7 0-8.4 3.8-8.4 8.4V116H39.3c-6.5 0-11.8-5.3-11.8-11.8V69.4Z"
          />
          <path className="p4-home-chimney" d="M88 33h17v29.5L88 48.4V33Z" />
        </svg>
      </button>

      <button className="p4-back-btn" onClick={() => navigate("/grades")}>
        « {t.back}
      </button>

      <div className="p4-content">
        <header className="p4-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </header>

        <section className="p4-grid">
          {t.cards.map((card) => (
            <div key={card.title} className="p4-card" onClick={card.onClick}>
              <img src={card.image} alt={card.alt} className="p4-card-img" />

              <div className="p4-card-body">
                <h2>{card.title}</h2>
                <button
                  type="button"
                  className="p4-sound-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    speakText(card.title, VOICE_MAP[lang]);
                  }}
                  aria-label={card.title}
                  title={card.title}
                >
                  {"\u{1F50A}"}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="p4-langbar" aria-label="Language selector">
        <button
          type="button"
          className={`p4-langbtn ${lang === "th" ? "is-active" : ""}`}
          onClick={() => setLang("th")}
        >
          {t.chipTh}
        </button>
        <button
          type="button"
          className={`p4-langbtn ${lang === "ms" ? "is-active" : ""}`}
          onClick={() => setLang("ms")}
        >
          {t.chipMs}
        </button>
        <button
          type="button"
          className={`p4-langbtn ${lang === "en" ? "is-active" : ""}`}
          onClick={() => setLang("en")}
        >
          {t.chipEn}
        </button>
      </div>
    </div>
  );
}
