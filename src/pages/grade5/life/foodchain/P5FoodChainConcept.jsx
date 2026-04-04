import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FoodChainLanguageSwitcher, FoodChainNavButtons } from "./FoodChainControls";

export default function P5FoodChainConcept() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("th");

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(#eeeeee,#cdecc7)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "140px",
          height: "140px",
          background: "#ffeb3b",
          borderRadius: "50%",
        }}
      />

      <h1
        style={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        สรุปสาระสำคัญ : การถ่ายทอดพลังงานห่วงโซ่อาหาร
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        โซ่อาหาร คือ ความสัมพันธ์ของสิ่งมีชีวิตโดยการกินต่อกันเป็นทอด ๆ
      </p>

      <div
        style={{
          position: "absolute",
          left: "80px",
          top: "180px",
          width: "250px",
        }}
      >
        <h2 style={{ color: "green" }}>ผู้ผลิต</h2>
        <p>
          สิ่งมีชีวิตที่สร้างอาหารเองได้
          <br />
          เช่น พืช สาหร่าย
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: "420px",
          top: "220px",
        }}
      >
        <h2 style={{ color: "red" }}>ผู้บริโภค</h2>
        <p>สัตว์กินพืช → สัตว์กินทั้งพืชและสัตว์ → สัตว์กินเนื้อ</p>
      </div>

      <div
        style={{
          position: "absolute",
          right: "80px",
          top: "200px",
          width: "260px",
        }}
      >
        <h2 style={{ color: "#8B4513" }}>ผู้ย่อยสลาย</h2>
        <p>
          ช่วยย่อยสลายซากสิ่งมีชีวิต
          <br />
          เช่น เห็ด และแบคทีเรีย
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: "300px",
          top: "300px",
          fontSize: "40px",
        }}
      >
        🌱 ➜ 🐛 ➜ 🐔 ➜ 🦅
      </div>

      <div className="absolute bottom-5 left-5">
        <FoodChainLanguageSwitcher value={activeLang} onChange={setActiveLang} />
      </div>

      <div className="absolute bottom-5 right-5">
        <FoodChainNavButtons
          backLabel="ย้อนกลับ"
          nextLabel="ไปต่อ"
          onBack={() => navigate(-1)}
          onNext={() => navigate("/p5/life/foodchain/steps")}
        />
      </div>
    </div>
  );
}
