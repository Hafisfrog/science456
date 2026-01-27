import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/P4Gravity";
import P4GravityVocab from "./pages/grade4/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/P4GravitySim1";
import P4GravityObjectives from "./pages/grade4/P4GravityObjectives";

import Grade6 from "./pages/grade6";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/grades" element={<SelectGrade />} />

        <Route path="/p4" element={<P4 />} />
        <Route path="/p4/gravity" element={<P4Gravity />} />
        <Route path="/p4/gravity/vocab" element={<P4GravityVocab />} />
        <Route path="/p4/gravity/sim1" element={<P4GravitySim1 />} />
        <Route path="/p4/gravity/objectives" element={<P4GravityObjectives />} />

        {/* placeholder หน้า experiment */}
        <Route path="/p4/gravity/:slug" element={<div style={{padding:40}}>หน้าการทดลอง (กำลังทำ)</div>} />
        {/* เผื่อไว้ต่อยอด */}
        <Route
          path="/p4"
          element={<div style={{ padding: 40 }}>หน้า ป.4 (กำลังทำ)</div>}
        />
        <Route
          path="/p5"
          element={<div style={{ padding: 40 }}>หน้า ป.5 (กำลังทำ)</div>}
        />
        <Route path="/p6" element={<Grade6 />} />b882feda5974c2c
      </Routes>
    </BrowserRouter>
  );
}