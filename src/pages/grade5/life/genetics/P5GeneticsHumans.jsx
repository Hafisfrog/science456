import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabLayout from "../../../../components/LabLayout";
import { LANG_BUTTON_TEXT, NEXT_LABEL, useP5GeneticsLang } from "./p5GeneticsI18n";
import "./P5GeneticsHumans.css";

const IMAGE_VERSION = "20260302-human-v2";

const TEXT = {
  th: {
    title: "การถ่ายทอดลักษณะทางพันธุกรรมของคน",
    topic: "ลักษณะทางพันธุกรรมต่าง ๆ ของคน",
    tapImage: "แตะรูป",
    traits: {
      "straight-hair": "ผมตรง",
      "double-eyelid": "ตา 2 ชั้น",
      draw: "ชอบวาดรูป",
      dimple: "มีลักยิ้ม",
      "no-dimple": "ไม่มีลักยิ้ม",
      music: "ชอบเล่นดนตรี",
      "curly-hair": "ผมหยิก",
      green: "ชอบสีเขียว",
      nose: "สันจมูกโด่ง",
      tongue: "ม้วนลิ้นได้",
      sports: "ชอบเล่นกีฬา",
      "single-eyelid": "ตาชั้นเดียว",
    },
  },
  en: {
    title: "Inheritance of Human Traits",
    topic: "Different Human Genetic Traits",
    tapImage: "Tap Image",
    traits: {
      "straight-hair": "Straight Hair",
      "double-eyelid": "Double Eyelid",
      draw: "Likes Drawing",
      dimple: "Has Dimple",
      "no-dimple": "No Dimple",
      music: "Likes Music",
      "curly-hair": "Curly Hair",
      green: "Likes Green",
      nose: "High Nose Bridge",
      tongue: "Can Roll Tongue",
      sports: "Likes Sports",
      "single-eyelid": "Single Eyelid",
    },
  },
  ms: {
    title: "Pewarisan Ciri Genetik Manusia",
    topic: "Pelbagai Ciri Genetik Manusia",
    tapImage: "Sentuh Gambar",
    traits: {
      "straight-hair": "Rambut Lurus",
      "double-eyelid": "Mata 2 Kelopak",
      draw: "Suka Melukis",
      dimple: "Ada Lesung Pipit",
      "no-dimple": "Tiada Lesung Pipit",
      music: "Suka Bermain Muzik",
      "curly-hair": "Rambut Kerinting",
      green: "Suka Warna Hijau",
      nose: "Batang Hidung Tinggi",
      tongue: "Boleh Gulung Lidah",
      sports: "Suka Bersukan",
      "single-eyelid": "Mata Satu Kelopak",
    },
  },
};

const TRAITS = [
  {
    id: "straight-hair",
    inherited: true,
    localImg: "/images/p5/humans/straight-hair.jpg",
    remoteImg:
      "https://images.pexels.com/photos/15603371/pexels-photo-15603371.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 40%",
  },
  {
    id: "double-eyelid",
    inherited: true,
    localImg: "/images/p5/humans/double-eyelid.jpg",
    remoteImg:
      "https://images.pexels.com/photos/9769854/pexels-photo-9769854.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 50%",
  },
  {
    id: "draw",
    inherited: false,
    localImg: "/images/p5/humans/draw.jpg",
    remoteImg:
      "https://images.pexels.com/photos/4442090/pexels-photo-4442090.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 50%",
  },
  {
    id: "dimple",
    inherited: true,
    localImg: "/images/p5/humans/dimple.jpg",
    remoteImg:
      "https://images.pexels.com/photos/11495977/pexels-photo-11495977.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 36%",
  },
  {
    id: "no-dimple",
    inherited: true,
    localImg: "/images/p5/humans/no-dimple.jpg",
    remoteImg:
      "https://images.pexels.com/photos/30427604/pexels-photo-30427604.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 35%",
  },
  {
    id: "music",
    inherited: false,
    localImg: "/images/p5/humans/music.jpg",
    remoteImg:
      "https://images.pexels.com/photos/8471931/pexels-photo-8471931.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 44%",
  },
  {
    id: "curly-hair",
    inherited: true,
    localImg: "/images/p5/humans/curly-hair.jpg",
    remoteImg:
      "https://images.pexels.com/photos/1897534/pexels-photo-1897534.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 25%",
  },
  {
    id: "green",
    inherited: false,
    localImg: "/images/p5/humans/green.jpg",
    remoteImg:
      "https://images.pexels.com/photos/15602819/pexels-photo-15602819.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 50%",
  },
  {
    id: "nose",
    inherited: true,
    localImg: "/images/p5/humans/nose.jpg",
    remoteImg:
      "https://images.pexels.com/photos/9164794/pexels-photo-9164794.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 54%",
  },
  {
    id: "tongue",
    inherited: true,
    localImg: "/images/p5/humans/tongue.jpg",
    remoteImg:
      "https://images.pexels.com/photos/4975808/pexels-photo-4975808.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 50%",
  },
  {
    id: "sports",
    inherited: false,
    localImg: "/images/p5/humans/sports.jpg",
    remoteImg:
      "https://images.pexels.com/photos/8034614/pexels-photo-8034614.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 46%",
  },
  {
    id: "single-eyelid",
    inherited: true,
    localImg: "/images/p5/humans/single-eyelid.jpg",
    remoteImg:
      "https://images.pexels.com/photos/7626597/pexels-photo-7626597.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    imagePosition: "50% 55%",
  },
];

export default function P5GeneticsHumans() {
  const navigate = useNavigate();
  const { lang, setLang } = useP5GeneticsLang();
  const [results, setResults] = useState({});
  const t = TEXT[lang];
  const labels = LANG_BUTTON_TEXT[lang];

  const handleTraitClick = (trait) => {
    setResults((prev) => {
      if (prev[trait.id]) return prev;
      return { ...prev, [trait.id]: trait.inherited ? "correct" : "wrong" };
    });
  };

  return (
    <LabLayout title={t.title} showTeacher={false}>
      <div className="p5gh-page">
        <section className="p5gh-board">
          <h1>{t.title}</h1>

          <div className="p5gh-topic">{t.topic}</div>

          <div className="p5gh-content">
            <div className="p5gh-start-wrap">
              <div className="p5gh-start-icon" aria-hidden="true">
                ▶
              </div>
              <p>{t.tapImage}</p>
            </div>

            <div className="p5gh-grid">
              {TRAITS.map((trait) => (
                <div key={trait.id} className="p5gh-card">
                  <button type="button" className="p5gh-image-wrap p5gh-choice" onClick={() => handleTraitClick(trait)}>
                    <img
                      src={`${trait.localImg}?v=${IMAGE_VERSION}`}
                      alt={t.traits[trait.id]}
                      className="p5gh-image"
                      style={{ objectPosition: trait.imagePosition }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        const stage = event.currentTarget.dataset.fallbackStage || "local";
                        if (stage === "local") {
                          event.currentTarget.dataset.fallbackStage = "remote";
                          event.currentTarget.src = `${trait.remoteImg}&v=${IMAGE_VERSION}`;
                          return;
                        }
                        event.currentTarget.src = `/images/p5.png?v=${IMAGE_VERSION}`;
                      }}
                    />
                    <div
                      className={[
                        "p5gh-mark",
                        results[trait.id] ? "is-visible" : "",
                        results[trait.id] === "correct" ? "is-correct" : "",
                        results[trait.id] === "wrong" ? "is-wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      aria-hidden="true"
                    >
                      {results[trait.id] === "correct" ? "✓" : results[trait.id] === "wrong" ? "✕" : ""}
                    </div>
                  </button>
                  <p className="p5gh-label">{t.traits[trait.id]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="p5gh-ground">
          <div className="p5gh-lang">
            <button type="button" className={lang === "th" ? "is-active" : ""} onClick={() => setLang("th")}>
              {labels.th}
            </button>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              {labels.en}
            </button>
            <button type="button" className={lang === "ms" ? "is-active" : ""} onClick={() => setLang("ms")}>
              {labels.ms}
            </button>
            <button type="button" className="p5gh-audio" aria-label="audio">
              🔊
            </button>
          </div>

          <button className="p5gh-next" onClick={() => navigate("/p5/life/genetics/humans/summary")}>
            {NEXT_LABEL[lang]}
          </button>
        </footer>
      </div>
    </LabLayout>
  );
}
