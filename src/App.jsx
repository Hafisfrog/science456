import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";

// ===== ป.4 =====
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/P4Gravity";
import P4GravityVocab from "./pages/grade4/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/P4GravitySim1";
import P4GravityObjectives from "./pages/grade4/P4GravityObjectives";

import P4Light from "./pages/grade4/light/P4Light";
import P4LightIntro from "./pages/grade4/light/P4LightIntro";
import P4LightVocab from "./pages/grade4/light/P4LightVocab";
import P4LightSelect from "./pages/grade4/light/P4LightSelect";
import P4LightExperiment from "./pages/grade4/light/P4LightExperiment";
import P4LightRecord from "./pages/grade4/light/P4LightRecord";
import P4LightCheck from "./pages/grade4/light/P4LightCheck";
import P4LightSummary from "./pages/grade4/light/P4LightSummary";
import P4LightQA from "./pages/grade4/light/P4LightQA";
import P4LightConceptSummary from "./pages/grade4/light/P4LightConceptSummary";

// ===== ป.5 — ชีวิตสัมพันธ์ (ห่วงโซ่อาหาร) =====
import P5LifeIntro from "./pages/grade5/life/P5LifeIntro";
import P5FoodChainIntro from "./pages/grade5/life/foodchain/P5FoodChainIntro";
import P5FoodChainVocab from "./pages/grade5/life/foodchain/P5FoodChainVocab";
import P5FoodChainSteps from "./pages/grade5/life/foodchain/P5FoodChainSteps";
import P5FoodChainSelect from "./pages/grade5/life/foodchain/P5FoodChainSelect";
import P5FoodChainSim from "./pages/grade5/life/foodchain/P5FoodChainSim";
import P5FoodChainCheck from "./pages/grade5/life/foodchain/P5FoodChainCheck";
import P5FoodChainSummary from "./pages/grade5/life/foodchain/P5FoodChainSummary";

// ===== ป.6 =====
import Grade6 from "./pages/grade6";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/grades" element={<SelectGrade />} />

        {/* ===== ป.4 ===== */}
        <Route path="/p4" element={<P4 />} />

        {/* ===== Gravity (ป.4) ===== */}
        <Route path="/p4/gravity" element={<P4Gravity />} />
        <Route path="/p4/gravity/vocab" element={<P4GravityVocab />} />
        <Route path="/p4/gravity/sim1" element={<P4GravitySim1 />} />
        <Route path="/p4/gravity/objectives" element={<P4GravityObjectives />} />
        <Route
          path="/p4/gravity/:slug"
          element={<div style={{ padding: 40 }}>หน้าการทดลอง (กำลังทำ)</div>}
        />

        {/* ===== Light (ตัวกลางของแสง) ป.4 ===== */}
        <Route path="/p4/light" element={<P4Light />} />
        <Route path="/p4/light/intro" element={<P4LightIntro />} />
        <Route path="/p4/light/vocab" element={<P4LightVocab />} />
        <Route path="/p4/light/select" element={<P4LightSelect />} />
        <Route path="/p4/light/experiment" element={<P4LightExperiment />} />
        <Route path="/p4/light/record" element={<P4LightRecord />} />
        <Route path="/p4/light/check" element={<P4LightCheck />} />
        <Route path="/p4/light/summary" element={<P4LightSummary />} />
        <Route path="/p4/light/qa" element={<P4LightQA />} />
        <Route path="/p4/light/concept" element={<P4LightConceptSummary />} />

        {/* ====================== */}
        {/* ===== ป.5 (ชีวิตสัมพันธ์ → ห่วงโซ่อาหาร) ===== */}
        {/* ====================== */}

        {/* STEP 1 */}
        <Route path="/p5/life" element={<P5LifeIntro />} />

        {/* STEP 2 */}
        <Route path="/p5/life/foodchain" element={<P5FoodChainIntro />} />

        {/* STEP 3 */}
        <Route path="/p5/life/foodchain/vocab" element={<P5FoodChainVocab />} />

        {/* STEP 4 */}
        <Route path="/p5/life/foodchain/steps" element={<P5FoodChainSteps />} />

        {/* STEP 5 */}
        <Route path="/p5/life/foodchain/select" element={<P5FoodChainSelect />} />

        {/* STEP 6 */}
        <Route path="/p5/life/foodchain/sim" element={<P5FoodChainSim />} />

        {/* STEP 7 */}
        <Route path="/p5/life/foodchain/check" element={<P5FoodChainCheck />} />

        {/* STEP 8 */}
        <Route path="/p5/life/foodchain/summary" element={<P5FoodChainSummary />} />

        {/* ===== ชั้นอื่น ๆ ===== */}
        <Route
          path="/p5"
          element={<div style={{ padding: 40 }}>หน้า ป.5 (กำลังทำ)</div>}
        />
        <Route path="/p6" element={<Grade6 />} />
      </Routes>
    </BrowserRouter>
  );
}
