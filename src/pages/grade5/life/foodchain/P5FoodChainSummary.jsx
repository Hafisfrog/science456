import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeakButton from "../../../../components/SpeakButton";

const CONTENT = {
  th: {
    title: "สรุปผลการทดลอง",
    paragraph1:
      "จากกิจกรรมนี้ เราพบว่าสิ่งมีชีวิตแต่ละชนิดมีความสัมพันธ์กันเป็นระบบ โดยพลังงานถ่ายทอดจากผู้ผลิตไปยังผู้บริโภคตามลำดับผ่านกระบวนการกินเป็นอาหาร",
    paragraph2:
      "ดังนั้น ห่วงโซ่อาหารจึงเป็นกลไกสำคัญที่ช่วยถ่ายทอดพลังงานและรักษาสมดุลของระบบนิเวศ สิ่งมีชีวิตทุกชนิดล้วนมีบทบาทต่อกัน",
    back: "ย้อนกลับ",
    next: "ต่อไป",
  },
  en: {
    title: "Experiment Summary",
    paragraph1:
      "From this activity, we found that living things are connected as a system. Energy is transferred from producers to consumers in sequence through feeding relationships.",
    paragraph2:
      "Therefore, food chains are a key mechanism for energy transfer and ecosystem balance. Every living organism has an important role in the system.",
    back: "Back",
    next: "Next",
  },
  ms: {
    title: "Ringkasan Eksperimen",
    paragraph1:
      "Daripada aktiviti ini, kita dapati hidupan saling berkaitan dalam satu sistem. Tenaga dipindahkan daripada pengeluar kepada pengguna secara berurutan melalui hubungan pemakanan.",
    paragraph2:
      "Oleh itu, rantai makanan ialah mekanisme penting untuk pemindahan tenaga dan keseimbangan ekosistem. Setiap hidupan mempunyai peranan dalam sistem ini.",
    back: "Kembali",
    next: "Seterusnya",
  },
};

export default function P5FoodChainSummary() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");

  const content = CONTENT[activeLang] ?? CONTENT.th;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom,#eeeeee,#cdecc7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "40px 16px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "30px", textAlign: "center" }}>
        {content.title}
      </h1>

      <div
        style={{
          width: "70%",
          maxWidth: "900px",
          background: "white",
          padding: "40px",
          border: "5px solid black",
          borderRadius: "20px",
          fontSize: "20px",
          lineHeight: "1.8",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <p>{content.paragraph1}</p>
        <p style={{ marginTop: "18px" }}>{content.paragraph2}</p>

        <div style={{ marginTop: "28px" }}>
          <SpeakButton
            th={`${CONTENT.th.paragraph1} ${CONTENT.th.paragraph2}`}
            en={`${CONTENT.en.paragraph1} ${CONTENT.en.paragraph2}`}
            ms={`${CONTENT.ms.paragraph1} ${CONTENT.ms.paragraph2}`}
            activeLang={activeLang}
            onLanguageChange={setActiveLang}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          width: "70%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "14px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "14px 34px",
            fontSize: "20px",
            background: "#6b7280",
            color: "white",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {content.back}
        </button>

        <button
          onClick={() => navigate("/p5/life/foodchain/summary2")}
          style={{
            padding: "14px 40px",
            fontSize: "20px",
            background: "#e53935",
            color: "white",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {content.next}
        </button>
      </div>
    </div>
  );
}
