import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";
// import Grade6 from "./pages/grade6";
import P6 from "./pages/grade6/P6";
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/P4Gravity";
import P4GravityVocab from "./pages/grade4/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/P4GravitySim1";
import P4GravityObjectives from "./pages/grade4/P4GravityObjectives";
import P4GravityExp1Materials from "./pages/grade4/P4GravityExp1Materials";
import P4GravityExp1Steps from "./pages/grade4/P4GravityExp1Steps";
import P4GravityExp1Question from "./pages/grade4/P4GravityExp1Question";
import P4GravityExp1Action from "./pages/grade4/P4GravityExp1Action";
import P4GravityExp1Result from "./pages/grade4/P4GravityExp1Result";
import P4GravityExp1Answer from "./pages/grade4/P4GravityExp1Answer";
//p4 gravity exp2
import P4GravityExp2Vocab from "./pages/grade4/exp2/P4GravityExp2Vocab";
import P4GravityExp2Materials from "./pages/grade4/exp2/P4GravityExp2Materials";
import P4GravityExp2Steps from "./pages/grade4/exp2/P4GravityExp2Steps";
import P4GravityExp2Question from "./pages/grade4/exp2/P4GravityExp2Question";
import P4GravityExp2Action from "./pages/grade4/exp2/P4GravityExp2Action";
import P4GravityExp2Result from "./pages/grade4/exp2/P4GravityExp2Result";


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
import Grade6 from "./pages/grade6";
import P6ElectricCircuitVocab from "./pages/grade6/P6ElectricCircuitVocab";
import P6ElectricCircuitObjectives from "./pages/grade6/P6ElectricCircuitObjectives";
import P6ElectricCircuitIntro from "./pages/grade6/P6ElectricCircuitIntro";
import P6ElectricCircuitProblem from "./pages/grade6/P6ElectricCircuitProblem";
import P6ElectricCircuitSteps from "./pages/grade6/P6ElectricCircuitSteps";
import P6ElectricCircuitResults from "./pages/grade6/P6ElectricCircuitResults";
import P6ElectricCircuitSim from "./pages/grade6/P6ElectricCircuitSim";
// import Grade6 from "./pages/grade6/index.jsx";
// import P4GravityExp1Action from "./pages/grade4/P4GravityExp1Action";
// import P4GravityExp1Result from "./pages/grade4/P4GravityExp1Result";


// import Grade6 from "./pages/grade6";

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
        <Route path="/p4/gravity/exp1/action" element={<P4GravityExp1Action />} />
        <Route path="/p4/gravity/exp1/result" element={<P4GravityExp1Result />} />
        <Route path="/p4/gravity/exp1/answer" element={<P4GravityExp1Answer />} />

        <Route path="/p4/gravity/exp2/vocab" element={<P4GravityExp2Vocab />} />
        <Route path="/p4/gravity/exp2/materials" element={<P4GravityExp2Materials />} />
        <Route path="/p4/gravity/exp2/steps" element={<P4GravityExp2Steps />} />
        <Route path="/p4/gravity/exp2/question" element={<P4GravityExp2Question />} />
        <Route path="/p4/gravity/exp2/action" element={<P4GravityExp2Action />} />
        <Route path="/p4/gravity/exp2/result" element={<P4GravityExp2Result />} />

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
          path="/p6/electric-circuit-old"
          element={<div style={{ padding: 40 }}>วงจรไฟฟ้าใกล้ตัว (กำลังทำ)</div>}
        />
        <Route path="/p6/electric-circuit" element={<P6ElectricCircuitVocab />} />
        <Route path="/p6/electric-circuit/problem" element={<P6ElectricCircuitProblem />} />
        <Route path="/p6/electric-circuit/steps" element={<P6ElectricCircuitSteps />} />
        <Route
          path="/p6/electric-circuit/sim"
          element={<P6ElectricCircuitSim />}
        />
        <Route path="/p6/electric-circuit/result" element={<P6ElectricCircuitResults />} />
        <Route path="/p6/electric-circuit/objectives" element={<P6ElectricCircuitObjectives />} />
        <Route path="/p6/electric-circuit/intro" element={<P6ElectricCircuitIntro />} />
        <Route
          path="/p6/electric-circuit/lesson/components"
          element={<div style={{ padding: 40 }}>องค์ประกอบของวงจรไฟฟ้า (กำลังทำ)</div>}
        />
        <Route
          path="/p6/electric-circuit/lesson/series-parallel"
          element={<div style={{ padding: 40 }}>การต่อเซลล์ไฟฟ้าแบบอนุกรมและขนาน (กำลังทำ)</div>}
        />
        <Route
          path="/p6/electric-circuit/lesson/open-closed"
          element={<div style={{ padding: 40 }}>วงจรเปิดและวงจรปิด (กำลังทำ)</div>}
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

        {/* placeholder หน้า experiment */}
        <Route path="/p4/gravity/:slug" element={<div style={{padding:40}}>หน้าการทดลอง (กำลังทำ)</div>} />
      </Routes>
    </BrowserRouter>
  );
}
