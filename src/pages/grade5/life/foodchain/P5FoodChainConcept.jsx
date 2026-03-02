import { useNavigate } from "react-router-dom";

export default function P5FoodChainConcept() {

const navigate = useNavigate();

return (

<div style={{
width:"100%",
height:"100vh",
background:"linear-gradient(#eeeeee,#cdecc7)",
position:"relative",
overflow:"hidden",
fontFamily:"sans-serif"
}}>


{/* ===== Sun ===== */}

<div style={{
position:"absolute",
top:"0",
left:"0",
width:"140px",
height:"140px",
background:"#ffeb3b",
borderRadius:"50%"
}}/>


{/* ===== Title ===== */}

<h1 style={{
textAlign:"center",
paddingTop:"20px",
fontSize:"32px",
fontWeight:"bold"
}}>
สรุปสาระสำคัญ : การถ่ายทอดพลังงานห่วงโซ่อาหาร
</h1>


<p style={{
textAlign:"center",
fontSize:"20px"
}}>
โซ่อาหาร คือ ความสัมพันธ์ของสิ่งมีชีวิตโดยการกินต่อกันเป็นทอด ๆ
</p>



{/* ===== Producer ===== */}

<div style={{
position:"absolute",
left:"80px",
top:"180px",
width:"250px"
}}>

<h2 style={{color:"green"}}>
ผู้ผลิต
</h2>

<p>
สิ่งมีชีวิตที่สร้างอาหารเองได้
เช่น พืช สาหร่าย
</p>

</div>



{/* ===== Consumers ===== */}

<div style={{
position:"absolute",
left:"420px",
top:"220px"
}}>

<h2 style={{
color:"red"
}}>
ผู้บริโภค
</h2>

<p>
สัตว์กินพืช → สัตว์กินทั้งพืชและสัตว์ → สัตว์กินเนื้อ
</p>

</div>



{/* ===== Decomposer ===== */}

<div style={{
position:"absolute",
right:"80px",
top:"200px",
width:"260px"
}}>

<h2 style={{
color:"#8B4513"
}}>
ผู้ย่อยสลาย
</h2>

<p>
ช่วยย่อยสลายซากสิ่งมีชีวิต
เช่น เห็ด และแบคทีเรีย
</p>

</div>



{/* ===== Arrows ===== */}

<div style={{
position:"absolute",
left:"300px",
top:"300px",
fontSize:"40px"
}}>
🌱 ➜ 🐛 ➜ 🐔 ➜ 🦅
</div>



{/* ===== Language Buttons ===== */}

<div style={{
position:"absolute",
bottom:"20px",
left:"20px"
}}>

<button style={{
marginRight:"10px",
padding:"10px 20px",
borderRadius:"20px",
border:"none",
background:"#9bd0f5"
}}>
ไทย
</button>

<button style={{
marginRight:"10px",
padding:"10px 20px",
borderRadius:"20px",
border:"none",
background:"#bfe3fb"
}}>
อังกฤษ
</button>

<button style={{
marginRight:"10px",
padding:"10px 20px",
borderRadius:"20px",
border:"none",
background:"#bfe3fb"
}}>
มลายู
</button>

<button style={{
padding:"10px",
borderRadius:"50%",
border:"none",
background:"#5aa9e6",
color:"white"
}}>
🔊
</button>

</div>



{/* ===== Next Button ===== */}

<button
onClick={()=>navigate("/p5/life/foodchain/steps")}
style={{
position:"absolute",
bottom:"20px",
right:"30px",
padding:"14px 40px",
fontSize:"22px",
background:"#e53935",
color:"white",
borderRadius:"30px",
border:"none",
cursor:"pointer"
}}
>

ต่อไป 

</button>


</div>

);
}