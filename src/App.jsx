import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";
import Grade6 from "./pages/grade6";
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/P4Gravity";
import P4GravityVocab from "./pages/grade4/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/P4GravitySim1";
import P4GravityObjectives from "./pages/grade4/P4GravityObjectives";
import P4GravityExp1Materials from "./pages/grade4/P4GravityExp1Materials";
import P4GravityExp1Steps from "./pages/grade4/P4GravityExp1Steps";
import P4GravityExp1Question from "./pages/grade4/P4GravityExp1Question";
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
        <Route path="/p4/gravity/exp1/materials" element={<P4GravityExp1Materials />} />
        {/* <Route path="/p4/gravity/exp1/step1" element={<div style={{padding:40}}>Step 1 (กำลังทำ)</div>} /> */}
        <Route path="/p4/gravity/exp1/steps" element={<P4GravityExp1Steps />} />
        <Route path="/p4/gravity/exp1/question" element={<P4GravityExp1Question />} />

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
        <Route path="/p6" element={<Grade6 />} />
        <Route
          path="/p6/experiment/electric-generation"
          element={<div style={{ padding: 40 }}>หน้าการทดลอง: การเกิดไฟฟ้า</div>}
        />
        <Route
          path="/p6/experiment/electric-force-effect"
          element={<div style={{ padding: 40 }}>หน้าการทดลอง: ผลของแรงไฟฟ้า</div>}
        />
        <Route path="/p4" element={<P4 />} />
        <Route path="/p4/gravity" element={<P4Gravity />} />
        <Route path="/p4/gravity/vocab" element={<P4GravityVocab />} />
        <Route path="/p4/gravity/sim1" element={<P4GravitySim1 />} />
        <Route path="/p4/gravity/objectives" element={<P4GravityObjectives />} />

        {/* placeholder หน้า experiment */}
        <Route path="/p4/gravity/:slug" element={<div style={{padding:40}}>หน้าการทดลอง (กำลังทำ)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

        <Route path="/p6" element={<Grade6 />} />
      </Routes>
    </BrowserRouter>
  );
}