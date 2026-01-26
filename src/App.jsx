// import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/grades" element={<SelectGrade />} />

        {/* เผื่อไว้ต่อยอด */}
        <Route path="/p4" element={<div style={{padding:40}}>หน้า ป.4 (กำลังทำ)</div>} />
        <Route path="/p5" element={<div style={{padding:40}}>หน้า ป.5 (กำลังทำ)</div>} />
        <Route path="/p6" element={<div style={{padding:40}}>หน้า ป.6 (กำลังทำ)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

