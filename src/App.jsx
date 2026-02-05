import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";
import Grade6 from "./pages/grade6";
import P6 from "./pages/grade6/P6";
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/P4Gravity";
import P4GravityVocab from "./pages/grade4/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/P4GravitySim1";
import P4GravityObjectives from "./pages/grade4/P4GravityObjectives";
import P4GravityExp1Materials from "./pages/grade4/P4GravityExp1Materials";
import P4GravityExp1Steps from "./pages/grade4/P4GravityExp1Steps";
import P4GravityExp1Question from "./pages/grade4/P4GravityExp1Question";
import P6ElectricObjectives from "./pages/grade6/P6ElectricObjectives";
import P6ElectricVocab from "./pages/grade6/P6ElectricVocab";
import P6ElectricGenerationSteps from "./pages/grade6/P6ElectricGenerationSteps";
import P6ElectricGenerationSim from "./pages/grade6/P6ElectricGenerationSim";
import P6ElectricGenerationResult from "./pages/grade6/P6ElectricGenerationResult";
import P6ElectricGenerationSummary from "./pages/grade6/P6ElectricGenerationSummary";
import P6ElectricForceEffect from "./pages/grade6/P6ElectricForceEffect";
import P6ElectricForceEffectSteps from "./pages/grade6/P6ElectricForceEffectSteps";
import P6ElectricForceEffectSim from "./pages/grade6/P6ElectricForceEffectSim";
import P6ElectricForceEffectSummary from "./pages/grade6/P6ElectricForceEffectSummary";
import P6ElectricForceRecap from "./pages/grade6/P6ElectricForceRecap";
// import Grade6 from "./pages/grade6/index.jsx";


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
        <Route path="/p6" element={<P6 />} />
        <Route path="/p6/electric-force" element={<P6ElectricObjectives />} />
        <Route path="/p6/electric-force/vocab" element={<P6ElectricVocab />} />
        <Route path="/p6/electric-force/experiments" element={<Grade6 />} />
        <Route path="/p6/electric-force/recap" element={<P6ElectricForceRecap />} />
        <Route
          path="/p6/electric-circuit"
          element={<div style={{ padding: 40 }}>วงจรไฟฟ้าใกล้ตัว (กำลังทำ)</div>}
        />
        <Route path="/p6/experiment/electric-generation" element={<P6ElectricObjectives />} />
        <Route path="/p6/experiment/electric-generation/vocab" element={<P6ElectricVocab />} />
        <Route path="/p6/experiment/electric-generation/steps" element={<P6ElectricGenerationSteps />} />
        <Route path="/p6/experiment/electric-generation/sim" element={<P6ElectricGenerationSim />} />
        <Route path="/p6/experiment/electric-generation/result" element={<P6ElectricGenerationResult />} />
        <Route path="/p6/experiment/electric-generation/summary" element={<P6ElectricGenerationSummary />} />
        <Route path="/p6/experiment/electric-force-effect" element={<P6ElectricForceEffect />} />
        <Route
          path="/p6/experiment/electric-force-effect/steps"
          element={<P6ElectricForceEffectSteps />}
        />
        <Route
          path="/p6/experiment/electric-force-effect/sim"
          element={<P6ElectricForceEffectSim />}
        />
        <Route
          path="/p6/experiment/electric-force-effect/summary"
          element={<P6ElectricForceEffectSummary />}
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
