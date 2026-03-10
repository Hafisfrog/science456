import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";
import P6 from "./pages/grade6/P6";

// ===== ป.4 =====
import P4 from "./pages/grade4/P4";
import P4Gravity from "./pages/grade4/gravity/P4Gravity";
import P4GravityObjectives from "./pages/grade4/gravity/P4GravityObjectives";
import P4Summarize from "./pages/grade4/P4Summarize";
//P4 Gravity Exp 1
import P4GravityVocab from "./pages/grade4/gravity/exp1/P4GravityVocab";
import P4GravitySim1 from "./pages/grade4/gravity/exp1/P4GravitySim1";
import P4GravityExp1Materials from "./pages/grade4/gravity/exp1/P4GravityExp1Materials";
import P4GravityExp1Steps from "./pages/grade4/gravity/exp1/P4GravityExp1Steps";
import P4GravityExp1Question from "./pages/grade4/gravity/exp1/P4GravityExp1Question";
import P4GravityExp1Action from "./pages/grade4/gravity/exp1/P4GravityExp1Action";
import P4GravityExp1Result from "./pages/grade4/gravity/exp1/P4GravityExp1Result";
import P4GravityExp1Answer from "./pages/grade4/gravity/exp1/P4GravityExp1Answer";
//P4 Gravity Exp 2
import P4GravityExp2Vocab from "./pages/grade4/gravity/exp2/P4GravityExp2Vocab";
import P4GravityExp2Materials from "./pages/grade4/gravity/exp2/P4GravityExp2Materials";
import P4GravityExp2Steps from "./pages/grade4/gravity/exp2/P4GravityExp2Steps";
import P4GravityExp2Question from "./pages/grade4/gravity/exp2/P4GravityExp2Question";
import P4GravityExp2Action from "./pages/grade4/gravity/exp2/P4GravityExp2Action";
import P4GravityExp2Result from "./pages/grade4/gravity/exp2/P4GravityExp2Result";
import P4GravityExp2Answer from "./pages/grade4/gravity/exp2/P4GravityExp2Answer";
//P4 Gravity Exp 3
import P4GravityExp3Vocab from "./pages/grade4/gravity/exp3/P4GravityExp3Vocab";
import P4GravityExp3Steps from "./pages/grade4/gravity/exp3/P4GravityExp3Steps";
import P4GravityExp3Action from "./pages/grade4/gravity/exp3/P4GravityExp3Action";
import P4GravityExp3Result from "./pages/grade4/gravity/exp3/P4GravityExp3Result";
import P4GravityExp3Question from "./pages/grade4/gravity/exp3/P4GravityExp3Question";
import P4GravityExp3Answer from "./pages/grade4/gravity/exp3/P4GravityExp3Answer";

import P6ElectricObjectives from "./pages/grade6/P6ElectricObjectives";
import P6ElectricVocab from "./pages/grade6/P6ElectricVocab";
import P6ElectricGenerationMaterials from "./pages/grade6/P6ElectricGenerationMaterials";
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
import P6ElectricCircuitMaterials from "./pages/grade6/P6ElectricCircuitMaterials";
import P6ElectricCircuitSteps from "./pages/grade6/P6ElectricCircuitSteps";
import P6ElectricCircuitResults from "./pages/grade6/P6ElectricCircuitResults";
import P6ElectricCircuitSim from "./pages/grade6/P6ElectricCircuitSim";
import P6ElectricCircuitExperimentSelect from "./pages/grade6/P6ElectricCircuitExperimentSelect";
import P6ElectricCircuitBulbSeriesParallel from "./pages/grade6/P6ElectricCircuitBulbSeriesParallel";
import P6ElectricCircuitBulbSeriesParallelSteps from "./pages/grade6/P6ElectricCircuitBulbSeriesParallelSteps";
import P6ElectricCircuitBulbSeriesParallelSim from "./pages/grade6/P6ElectricCircuitBulbSeriesParallelSim";
// import Grade6 from "./pages/grade6/index.jsx";
// import P4GravityExp1Action from "./pages/grade4/P4GravityExp1Action";
// import P4GravityExp1Result from "./pages/grade4/P4GravityExp1Result";

import P4LightIntro from "./pages/grade4/light/P4LightIntro";
import P4LightVocab from "./pages/grade4/light/P4LightVocab";
import P4LightSelect from "./pages/grade4/light/P4LightSelect";
import P4LightExperiment from "./pages/grade4/light/P4LightExperiment";
import P4LightRecord from "./pages/grade4/light/P4LightRecord";
import P4LightCheck from "./pages/grade4/light/P4LightCheck";
import P4LightSummary from "./pages/grade4/light/P4LightSummary";
import P4LightQA from "./pages/grade4/light/P4LightQA";
import P4LightConceptSummary from "./pages/grade4/light/P4LightConceptSummary";
import P4LightIntroLearning from "./pages/grade4/light/P4LightIntroLearning";
import P4LightBasicWords from "./pages/grade4/light/P4LightBasicWords";
import P4LightThinking from "./pages/grade4/light/P4LightThinking";
import P4LightSituation from "./pages/grade4/light/P4LightSituation";
import P4LightObjective from "./pages/grade4/light/P4LightObjective";

import P5LifeIntro from "./pages/grade5/life/P5LifeIntro";
import P5FoodChainIntro from "./pages/grade5/life/foodchain/P5FoodChainIntro";
import P5FoodChainVocab from "./pages/grade5/life/foodchain/P5FoodChainVocab";
import P5FoodChainSteps from "./pages/grade5/life/foodchain/P5FoodChainSteps";
import P5FoodChainSelect from "./pages/grade5/life/foodchain/P5FoodChainSelect";
import P5FoodChainSim from "./pages/grade5/life/foodchain/P5FoodChainSim";
import P5FoodChainCheck from "./pages/grade5/life/foodchain/P5FoodChainCheck";
import P5FoodChainSummary from "./pages/grade5/life/foodchain/P5FoodChainSummary";
import P5GeneticsSelect from "./pages/grade5/life/genetics/P5GeneticsSelect";
import P5GeneticsAnimals from "./pages/grade5/life/genetics/P5GeneticsAnimals";
import P5GeneticsAnimalsSummary from "./pages/grade5/life/genetics/P5GeneticsAnimalsSummary";
import P5GeneticsPlants from "./pages/grade5/life/genetics/P5GeneticsPlants";
import P5GeneticsPlantsSummary from "./pages/grade5/life/genetics/P5GeneticsPlantsSummary";
import P5GeneticsHumans from "./pages/grade5/life/genetics/P5GeneticsHumans";
import P5GeneticsHumansSummary from "./pages/grade5/life/genetics/P5GeneticsHumansSummary";
import P5GeneticsTopicPlaceholder from "./pages/grade5/life/genetics/P5GeneticsTopicPlaceholder";
import GravityExp1Materials from "./pages/gravity/exp1/GravityExp1Materials";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/grades" element={<SelectGrade />} />

        <Route path="/p4" element={<P4 />} />

        <Route path="/p4/gravity" element={<P4Gravity />} />
        <Route path="/p4/gravity/objectives" element={<P4GravityObjectives />} />
        <Route path="/p4/gravity/summarize" element={<P4Summarize />} />
        
        <Route path="/p4/gravity/vocab" element={<P4GravityVocab />} />
        <Route path="/p4/gravity/sim1" element={<P4GravitySim1 />} />
        <Route path="/p4/gravity/exp1/materials" element={<P4GravityExp1Materials />} />
        <Route path="/gravity/exp1/materials" element={<GravityExp1Materials />} />
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
        <Route path="/p4/gravity/exp2/answer" element={<P4GravityExp2Answer />} />

        <Route path="/p4/gravity/exp3/vocab" element={<P4GravityExp3Vocab />} />
        <Route path="/p4/gravity/exp3/steps" element={<P4GravityExp3Steps />} />
        <Route path="/p4/gravity/exp3/action" element={<P4GravityExp3Action />} />
        <Route path="/p4/gravity/exp3/result" element={<P4GravityExp3Result />} />
        <Route path="/p4/gravity/exp3/answer" element={<P4GravityExp3Answer />} />
        <Route path="/p4/gravity/exp3/question" element={<P4GravityExp3Question />} />

        <Route path="/p4/light/intro" element={<P4LightIntro />} />
        <Route path="/p4/light/vocab" element={<P4LightVocab />} />
        <Route path="/p4/light/select" element={<P4LightSelect />} />
        <Route path="/p4/light/experiment" element={<P4LightExperiment />} />
        <Route path="/p4/light/record" element={<P4LightRecord />} />
        <Route path="/p4/light/check" element={<P4LightCheck />} />
        <Route path="/p4/light/summary" element={<P4LightSummary />} />
        <Route path="/p4/light/qa" element={<P4LightQA />} />
        <Route path="/p4/light/concept" element={<P4LightConceptSummary />} />
        <Route path="/p4/light/thinking" element={<P4LightThinking />} />
        <Route path="/p4/light/situation" element={<P4LightSituation />} />
        <Route path="/p4/light/objective" element={<P4LightObjective />} />
        <Route path="/p4/light/P4LightIntroLearning" element={<P4LightIntroLearning />} />
        <Route path="/p4/light/basic" element={<P4LightBasicWords />} />

        <Route path="/p5/life" element={<P5LifeIntro />} />
        <Route path="/p5/life/foodchain" element={<P5FoodChainIntro />} />
        <Route path="/p5/life/foodchain/vocab" element={<P5FoodChainVocab />} />
        <Route path="/p5/life/foodchain/steps" element={<P5FoodChainSteps />} />
        <Route path="/p5/life/foodchain/select" element={<P5FoodChainSelect />} />
        <Route path="/p5/life/foodchain/sim" element={<P5FoodChainSim />} />
        <Route path="/p5/life/foodchain/check" element={<P5FoodChainCheck />} />
        <Route path="/p5/life/foodchain/summary" element={<P5FoodChainSummary />} />

        {/* STEP 9 */}
        <Route path="/p5/life/genetics" element={<P5GeneticsSelect />} />
        <Route path="/p5/life/genetics/animals" element={<P5GeneticsAnimals />} />
        <Route path="/p5/life/genetics/animals/summary" element={<P5GeneticsAnimalsSummary />} />
        <Route path="/p5/life/genetics/plants" element={<P5GeneticsPlants />} />
        <Route path="/p5/life/genetics/plants/summary" element={<P5GeneticsPlantsSummary />} />
        <Route path="/p5/life/genetics/humans" element={<P5GeneticsHumans />} />
        <Route path="/p5/life/genetics/humans/summary" element={<P5GeneticsHumansSummary />} />
        <Route path="/p5/life/genetics/:topic" element={<P5GeneticsTopicPlaceholder />} />

        {/* ===== ชั้นอื่น ๆ ===== */}
        <Route path="/p5" element={<P5LifeIntro />} />
        <Route path="/p6" element={<P6 />} />
        <Route path="/p6/electric-force" element={<P6ElectricObjectives />} />
        <Route path="/p6/electric-force/vocab" element={<P6ElectricVocab />} />
        <Route path="/p6/electric-force/experiments" element={<Grade6 />} />
        <Route path="/p6/electric-force/recap" element={<P6ElectricForceRecap />} />
        <Route
          path="/p6/electric-circuit-old"
          element={<div style={{ padding: 40 }}>วงจรไฟฟ้าใกล้ตัว (กำลังทำ)</div>}
        />
        <Route path="/p6/electric-circuit" element={<P6ElectricCircuitObjectives />} />
        <Route path="/p6/electric-circuit/vocab" element={<P6ElectricCircuitVocab />} />
        <Route path="/p6/electric-circuit" element={<P6ElectricCircuitVocab />} />
        <Route path="/p6/electric-circuit/experiments" element={<P6ElectricCircuitExperimentSelect />} />
        <Route path="/p6/electric-circuit/problem" element={<P6ElectricCircuitProblem />} />
        <Route path="/p6/electric-circuit/materials" element={<P6ElectricCircuitMaterials />} />
        <Route path="/p6/electric-circuit/steps" element={<P6ElectricCircuitSteps />} />
        <Route
          path="/p6/electric-circuit/sim"
          element={<P6ElectricCircuitSim />}
        />
        <Route
          path="/p6/electric-circuit/bulb-series-parallel"
          element={<P6ElectricCircuitBulbSeriesParallel />}
        />
        <Route
          path="/p6/electric-circuit/bulb-series-parallel/steps"
          element={<P6ElectricCircuitBulbSeriesParallelSteps />}
        />
        <Route
          path="/p6/electric-circuit/bulb-series-parallel/sim"
          element={<P6ElectricCircuitBulbSeriesParallelSim />}
        />
        <Route path="/p6/electric-circuit/sim" element={<P6ElectricCircuitSim />} />
        <Route path="/p6/electric-circuit/bulb-series-parallel" element={<P6ElectricCircuitBulbSeriesParallel />} />
        <Route path="/p6/electric-circuit/result" element={<P6ElectricCircuitResults />} />
        <Route path="/p6/electric-circuit/objectives" element={<P6ElectricCircuitObjectives />} />
        <Route path="/p6/electric-circuit/intro" element={<P6ElectricCircuitIntro />} />
        <Route path="/p6/experiment/electric-generation" element={<P6ElectricObjectives />} />
        <Route path="/p6/experiment/electric-generation/vocab" element={<P6ElectricVocab />} />
        <Route path="/p6/experiment/electric-generation/materials" element={<P6ElectricGenerationMaterials />} />
        <Route path="/p6/experiment/electric-generation/steps" element={<P6ElectricGenerationSteps />} />
        <Route path="/p6/experiment/electric-generation/sim" element={<P6ElectricGenerationSim />} />
        <Route path="/p6/experiment/electric-generation/result" element={<P6ElectricGenerationResult />} />
        <Route path="/p6/experiment/electric-generation/summary" element={<P6ElectricGenerationSummary />} />
        <Route path="/p6/experiment/electric-force-effect" element={<P6ElectricForceEffect />} />
        <Route path="/p6/experiment/electric-force-effect/steps" element={<P6ElectricForceEffectSteps />} />
        <Route path="/p6/experiment/electric-force-effect/sim" element={<P6ElectricForceEffectSim />} />
        <Route path="/p6/experiment/electric-force-effect/summary" element={<P6ElectricForceEffectSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

