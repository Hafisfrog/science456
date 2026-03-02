import { useNavigate } from "react-router-dom";

export default function P5FoodChainSummary() {

  const navigate = useNavigate();

  return (

    <div style={{
      width: "100%",
      height: "100vh",
      background: "linear-gradient(to bottom,#eeeeee,#cdecc7)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "40px",
      boxSizing: "border-box"
    }}>

      {/* ===== Title ===== */}

      <h1 style={{
        fontSize: "32px",
        marginBottom: "30px"
      }}>
        สรุปผลการทดลอง
      </h1>


      {/* ===== Content Box ===== */}

      <div style={{
        width: "70%",
        maxWidth: "900px",
        background: "white",
        padding: "40px",
        border: "5px solid black",
        borderRadius: "20px",
        fontSize: "20px",
        lineHeight: "38px",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
      }}>

        จากการทำกิจกรรม พบว่า สิ่งมีชีวิตแต่ละชนิดมีความสัมพันธ์กันอย่างเป็นระบบ
        โดยพลังงานถ่ายทอดจากผู้ผลิต (พืช) และส่งต่อไปยังผู้บริโภคในลำดับต่าง ๆ
        ผ่านกระบวนการกินเป็นอาหาร

        <br /><br />

        ดังนั้น ห่วงโซ่อาหารเป็นกลไกสำคัญในการถ่ายทอดพลังงาน
        และรักษาความสมดุลของระบบนิเวศ สิ่งมีชีวิตทุกชนิดมีบทบาทต่อกัน
        ในระบบนิเวศเดียวกัน

      </div>


      {/* ===== Next Button ===== */}

      <button
        onClick={() => navigate("/p5/life/foodchain/intro")}
        style={{
          marginTop: "40px",
          padding: "14px 40px",
          fontSize: "20px",
          background: "#e53935",
          color: "white",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer"
        }}
      >

        ต่อไป 

      </button>


    </div>

  );

}