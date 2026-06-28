import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// ===== เธ.4 =====
const P4 = lazy(() => import("../pages/grade4/P4"));
const P4Summarize = lazy(() => import("../pages/grade4/P4Summarize"));
const P4Gravity = lazy(() => import("../pages/grade4/gravity/P4Gravity"));
const P4GravityObjectives = lazy(() => import("../pages/grade4/gravity/P4GravityObjectives"));
const P4GravityVocab = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityVocab"));
const P4GravityExp1Objectives = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Objectives"));
const P4GravityExp1ScienceSkills = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1ScienceSkills"));
const P4GravitySim1 = lazy(() => import("../pages/grade4/gravity/exp1/P4GravitySim1"));
const P4GravityExp1Materials = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Materials"));
const P4GravityExp1Steps = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Steps"));
const P4GravityExp1Question = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Question"));
const P4GravityExp1Action = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Action"));
const P4GravityExp1Result = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Result"));
const P4GravityExp1Answer = lazy(() => import("../pages/grade4/gravity/exp1/P4GravityExp1Answer"));
const P4GravityExp2Vocab = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Vocab"));
const P4GravityExp2Objectives = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Objectives"));
const P4GravityExp2ScienceSkills = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2ScienceSkills"));
const P4GravityExp2Materials = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Materials"));
const P4GravityExp2Steps = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Steps"));
const P4GravityExp2Question = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Question"));
const P4GravityExp2Action = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Action"));
const P4GravityExp2Result = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Result"));
const P4GravityExp2Answer = lazy(() => import("../pages/grade4/gravity/exp2/P4GravityExp2Answer"));
const P4GravityExp3Vocab = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Vocab"));
const P4GravityExp3Objectives = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Objectives"));
const P4GravityExp3ScienceSkills = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3ScienceSkills"));
const P4GravityExp3Materials = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Materials"));
const P4GravityExp3Steps = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Steps"));
const P4GravityExp3Action = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Action"));
const P4GravityExp3Result = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Result"));
const P4GravityExp3Question = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Question"));
const P4GravityExp3Answer = lazy(() => import("../pages/grade4/gravity/exp3/P4GravityExp3Answer"));

const P4LightIntro = lazy(() => import("../pages/grade4/light/P4LightIntro"));
const P4LightVocab = lazy(() => import("../pages/grade4/light/P4LightVocab"));
const P4LightSelect = lazy(() => import("../pages/grade4/light/P4LightSelect"));
const P4LightExperiment = lazy(() => import("../pages/grade4/light/P4LightExperiment"));
const P4LightRecord = lazy(() => import("../pages/grade4/light/P4LightRecord"));
const P4LightCheck = lazy(() => import("../pages/grade4/light/P4LightCheck"));
const P4LightSummary = lazy(() => import("../pages/grade4/light/P4LightSummary"));
const P4LightQA = lazy(() => import("../pages/grade4/light/P4LightQA"));
const P4LightConceptSummary = lazy(() => import("../pages/grade4/light/P4LightConceptSummary"));
const P4LightIntroLearning = lazy(() => import("../pages/grade4/light/P4LightIntroLearning"));
const P4LightBasicWords = lazy(() => import("../pages/grade4/light/P4LightBasicWords"));
const P4LightThinking = lazy(() => import("../pages/grade4/light/P4LightThinking"));
const P4LightSituation = lazy(() => import("../pages/grade4/light/P4LightSituation"));
const P4LightObjective = lazy(() => import("../pages/grade4/light/P4LightObjective"));
const P4LightScienceSkills = lazy(() => import("../pages/grade4/light/P4LightScienceSkills"));

// ===== เธ.5 =====
const P5LifeIntro = lazy(() => import("../pages/grade5/life/P5LifeIntro"));
const P5FoodChainIntro = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainIntro"));
const P5FoodChainObjectives = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainObjectives"));
const P5FoodChainScienceSkills = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainScienceSkills"));
const P5FoodChainVocab = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainVocab"));
const P5FoodChainSteps = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainSteps"));
const P5FoodChainSelect = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainSelect"));
const P5FoodChainScene = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainScene"));
const P5FoodChainMaterials = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainMaterials"));
const P5FoodChainSim = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainSim"));
const P5FoodChainCheck = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainCheck"));
const P5FoodChainSummary = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainSummary"));
const P5FoodChainsss = lazy(() => import("../pages/grade5/life/foodchain/P5FoodChainsss"));
const P5GeneticsObjectives = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsObjectives"));
const P5GeneticsVocab = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsVocab"));
const P5GeneticsVocab2 = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsVocab2"));
const P5GeneticsSelect = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsSelect"));
const P5GeneticsAnimalsObjectives = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsAnimalsObjectives"));
const P5GeneticsAnimalsScienceSkills = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsAnimalsScienceSkills"));
const P5GeneticsAnimals = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsAnimals"));
const P5GeneticsAnimalsSummary = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsAnimalsSummary"));
const P5GeneticsPlantsObjectives = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsPlantsObjectives"));
const P5GeneticsPlantsScienceSkills = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsPlantsScienceSkills"));
const P5GeneticsPlants = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsPlants"));
const P5GeneticsPlantsSummary = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsPlantsSummary"));
const P5GeneticsHumansObjectives = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumansObjectives"));
const P5GeneticsHumansScienceSkills = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumansScienceSkills"));
const P5GeneticsHumans = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumans"));
const P5GeneticsHumansSummary = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumansSummary"));
const P5GeneticsHumansSummary2 = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumansSummary2"));
const P5GeneticsHumansSummary3 = lazy(() => import("../pages/grade5/life/genetics/P5GeneticsHumansSummary3"));

// ===== เธ.6 =====
const P6 = lazy(() => import("../pages/grade6/P6"));
const Grade6 = lazy(() => import("../pages/grade6"));
const P6ElectricObjectives = lazy(() => import("../pages/grade6/P6ElectricObjectives"));
const P6ElectricVocab = lazy(() => import("../pages/grade6/P6ElectricVocab"));
const P6ElectricGenerationObjectives = lazy(() => import("../pages/grade6/P6ElectricGenerationObjectives"));
const P6ElectricGenerationScienceSkills = lazy(() => import("../pages/grade6/P6ElectricGenerationScienceSkills"));
const P6ElectricGenerationMaterials = lazy(() => import("../pages/grade6/P6ElectricGenerationMaterials"));
const P6ElectricGenerationSteps = lazy(() => import("../pages/grade6/P6ElectricGenerationSteps"));
const P6ElectricGenerationSim = lazy(() => import("../pages/grade6/P6ElectricGenerationSim"));
const P6ElectricGenerationResult = lazy(() => import("../pages/grade6/P6ElectricGenerationResult"));
const P6ElectricGenerationSummary = lazy(() => import("../pages/grade6/P6ElectricGenerationSummary"));
const P6ElectricGenerationKeySummary = lazy(() => import("../pages/grade6/P6ElectricGenerationKeySummary"));
const P6ElectricGenerationConclusion = lazy(() => import("../pages/grade6/P6ElectricGenerationConclusion"));
const P6ElectricGenerationConclusionQuestion = lazy(() => import("../pages/grade6/P6ElectricGenerationConclusionQuestion"));
const P6ElectricForceEffectObjectives = lazy(() => import("../pages/grade6/P6ElectricForceEffectObjectives"));
const P6ElectricForceEffectScienceSkills = lazy(() => import("../pages/grade6/P6ElectricForceEffectScienceSkills"));
const P6ElectricForceEffect = lazy(() => import("../pages/grade6/P6ElectricForceEffect"));
const P6ElectricForceEffectSteps = lazy(() => import("../pages/grade6/P6ElectricForceEffectSteps"));
const P6ElectricForceEffectSim = lazy(() => import("../pages/grade6/P6ElectricForceEffectSim"));
const P6ElectricForceEffectResult = lazy(() => import("../pages/grade6/P6ElectricForceEffectResult"));
const P6ElectricForceEffectKeySummary = lazy(() => import("../pages/grade6/P6ElectricForceEffectKeySummary"));
const P6ElectricForceRecap = lazy(() => import("../pages/grade6/P6ElectricForceRecap"));
const P6ElectricCircuitObjectives = lazy(() => import("../pages/grade6/P6ElectricCircuitObjectives"));
const P6ElectricCircuitExperiment1Objectives = lazy(() => import("../pages/grade6/P6ElectricCircuitExperiment1Objectives"));
const P6ElectricCircuitExperiment1ScienceSkills = lazy(() => import("../pages/grade6/P6ElectricCircuitExperiment1ScienceSkills"));
const P6ElectricCircuitExperiment2Objectives = lazy(() => import("../pages/grade6/P6ElectricCircuitExperiment2Objectives"));
const P6ElectricCircuitExperiment2ScienceSkills = lazy(() => import("../pages/grade6/P6ElectricCircuitExperiment2ScienceSkills"));
const P6ElectricCircuitVocab = lazy(() => import("../pages/grade6/P6ElectricCircuitVocab"));
const P6ElectricCircuitIntro = lazy(() => import("../pages/grade6/P6ElectricCircuitIntro"));
const P6ElectricCircuitMaterials = lazy(() => import("../pages/grade6/P6ElectricCircuitMaterials"));
const P6ElectricCircuitSteps = lazy(() => import("../pages/grade6/P6ElectricCircuitSteps"));
const P6ElectricCircuitResults = lazy(() => import("../pages/grade6/P6ElectricCircuitResults"));
const P6ElectricCircuitResultOverview = lazy(() => import("../pages/grade6/P6ElectricCircuitResultOverview"));
const P6ElectricCircuitSim = lazy(() => import("../pages/grade6/P6ElectricCircuitSim"));
const P6ElectricCircuitExperimentSelect = lazy(() => import("../pages/grade6/P6ElectricCircuitExperimentSelect"));
const P6ElectricCircuitBulbSeriesParallel = lazy(() => import("../pages/grade6/P6ElectricCircuitBulbSeriesParallel"));
const P6ElectricCircuitBulbSeriesParallelSteps = lazy(() => import("../pages/grade6/P6ElectricCircuitBulbSeriesParallelSteps"));
const P6ElectricCircuitBulbSeriesParallelSim = lazy(() => import("../pages/grade6/P6ElectricCircuitBulbSeriesParallelSim"));
const P6ElectricCircuitBulbSeriesParallelResult = lazy(() => import("../pages/grade6/P6ElectricCircuitBulbSeriesParallelResult"));
const P6ElectricCircuitBulbSeriesParallelSummary = lazy(() => import("../pages/grade6/P6ElectricCircuitBulbSeriesParallelSummary"));
const P6ElectricCircuitKeySummary = lazy(() => import("../pages/grade6/P6ElectricCircuitKeySummary"));

export default function OtherRoutes() {
  return (
    <Routes>
      <Route path="/p4" element={<P4 />} />

      <Route path="/p4/gravity" element={<P4Gravity />} />
      <Route path="/p4/gravity/objectives" element={<P4GravityObjectives />} />
      <Route path="/p4/gravity/summarize" element={<P4Summarize />} />

      <Route path="/p4/gravity/vocab" element={<P4GravityVocab />} />
      <Route path="/p4/gravity/exp1/objectives" element={<P4GravityExp1Objectives />} />
      <Route path="/p4/gravity/exp1/skills" element={<P4GravityExp1ScienceSkills />} />
      <Route path="/p4/gravity/sim1" element={<P4GravitySim1 />} />
      <Route path="/p4/gravity/exp1/materials" element={<P4GravityExp1Materials />} />
      <Route path="/p4/gravity/exp1/steps" element={<P4GravityExp1Steps />} />
      <Route path="/p4/gravity/exp1/question" element={<P4GravityExp1Question />} />
      <Route path="/p4/gravity/exp1/action" element={<P4GravityExp1Action />} />
      <Route path="/p4/gravity/exp1/result" element={<P4GravityExp1Result />} />
      <Route path="/p4/gravity/exp1/answer" element={<P4GravityExp1Answer />} />

      <Route path="/p4/gravity/exp2/vocab" element={<P4GravityExp2Vocab />} />
      <Route path="/p4/gravity/exp2/objectives" element={<P4GravityExp2Objectives />} />
      <Route path="/p4/gravity/exp2/skills" element={<P4GravityExp2ScienceSkills />} />
      <Route path="/p4/gravity/exp2/materials" element={<P4GravityExp2Materials />} />
      <Route path="/p4/gravity/exp2/steps" element={<P4GravityExp2Steps />} />
      <Route path="/p4/gravity/exp2/question" element={<P4GravityExp2Question />} />
      <Route path="/p4/gravity/exp2/action" element={<P4GravityExp2Action />} />
      <Route path="/p4/gravity/exp2/result" element={<P4GravityExp2Result />} />
      <Route path="/p4/gravity/exp2/answer" element={<P4GravityExp2Answer />} />

      <Route path="/p4/gravity/exp3/vocab" element={<P4GravityExp3Vocab />} />
      <Route path="/p4/gravity/exp3/objectives" element={<P4GravityExp3Objectives />} />
      <Route path="/p4/gravity/exp3/skills" element={<P4GravityExp3ScienceSkills />} />
      <Route path="/p4/gravity/exp3/materials" element={<P4GravityExp3Materials />} />
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
      <Route path="/p4/light/skills" element={<P4LightScienceSkills />} />
      <Route path="/p4/light/P4LightIntroLearning" element={<P4LightIntroLearning />} />
      <Route path="/p4/light/basic" element={<P4LightBasicWords />} />

      <Route path="/p5" element={<P5LifeIntro />} />
      <Route path="/p5/life" element={<P5LifeIntro />} />
      <Route path="/p5/life/foodchain" element={<P5FoodChainIntro />} />
      <Route path="/p5/life/foodchain/objectives" element={<P5FoodChainObjectives />} />
      <Route path="/p5/life/foodchain/skills" element={<P5FoodChainScienceSkills />} />
      <Route path="/p5/life/foodchain/vocab" element={<P5FoodChainVocab />} />
      <Route path="/p5/life/foodchain/scene" element={<P5FoodChainScene />} />
      <Route path="/p5/life/foodchain/materials" element={<P5FoodChainMaterials />} />
      <Route path="/p5/life/foodchain/steps" element={<P5FoodChainSteps />} />
      <Route path="/p5/life/foodchain/select" element={<P5FoodChainSelect />} />
      <Route path="/p5/life/foodchain/summary2" element={<P5FoodChainsss />} />
      <Route path="/p5/life/foodchain/sim" element={<P5FoodChainSim />} />
      <Route path="/p5/life/foodchain/check" element={<P5FoodChainCheck />} />
      <Route path="/p5/life/foodchain/summary" element={<P5FoodChainSummary />} />
      <Route path="/p5/life/genetics" element={<P5GeneticsSelect />} />
      <Route path="/p5/life/genetics/objectives" element={<P5GeneticsObjectives />} />
      <Route path="/p5/life/genetics/vocab" element={<P5GeneticsVocab />} />
      <Route path="/p5/life/genetics/vocab-2" element={<P5GeneticsVocab2 />} />
      <Route path="/p5/life/genetics/animals/objectives" element={<P5GeneticsAnimalsObjectives />} />
      <Route path="/p5/life/genetics/animals/skills" element={<P5GeneticsAnimalsScienceSkills />} />
      <Route path="/p5/life/genetics/animals" element={<P5GeneticsAnimals />} />
      <Route path="/p5/life/genetics/animals/summary" element={<P5GeneticsAnimalsSummary />} />
      <Route path="/p5/life/genetics/plants/objectives" element={<P5GeneticsPlantsObjectives />} />
      <Route path="/p5/life/genetics/plants/skills" element={<P5GeneticsPlantsScienceSkills />} />
      <Route path="/p5/life/genetics/plants" element={<P5GeneticsPlants />} />
      <Route path="/p5/life/genetics/plants/summary" element={<P5GeneticsPlantsSummary />} />
      <Route path="/p5/life/genetics/humans/objectives" element={<P5GeneticsHumansObjectives />} />
      <Route path="/p5/life/genetics/humans/skills" element={<P5GeneticsHumansScienceSkills />} />
      <Route path="/p5/life/genetics/humans" element={<P5GeneticsHumans />} />
      <Route path="/p5/life/genetics/humans/summary" element={<P5GeneticsHumansSummary />} />
      <Route path="/p5/life/genetics/humans/summary-2" element={<P5GeneticsHumansSummary2 />} />
      <Route path="/p5/life/genetics/humans/summary-3" element={<P5GeneticsHumansSummary3 />} />

      <Route path="/p6" element={<P6 />} />
      <Route path="/p6/electric-force" element={<P6ElectricObjectives />} />
      <Route path="/p6/electric-force/vocab" element={<P6ElectricVocab />} />
      <Route path="/p6/electric-force/experiments" element={<Grade6 />} />
      <Route path="/p6/electric-force/recap" element={<P6ElectricForceRecap />} />

      <Route
        path="/p6/electric-circuit-old"
        element={<div style={{ padding: 40 }}>เธงเธเธเธฃเนเธเธเนเธฒเนเธเธฅเนเธ•เธฑเธง (เธเธณเธฅเธฑเธเธ—เธณ)</div>}
      />
      <Route path="/p6/electric-circuit" element={<P6ElectricCircuitObjectives />} />
      <Route path="/p6/electric-circuit/objectives" element={<P6ElectricCircuitObjectives />} />
      <Route path="/p6/electric-circuit/vocab" element={<P6ElectricCircuitVocab />} />
      <Route path="/p6/electric-circuit/intro" element={<P6ElectricCircuitIntro />} />
      <Route path="/p6/electric-circuit/experiments" element={<P6ElectricCircuitExperimentSelect />} />
      <Route
        path="/p6/electric-circuit/experiment-1/objectives"
        element={<P6ElectricCircuitExperiment1Objectives />}
      />
      <Route
        path="/p6/electric-circuit/experiment-1/skills"
        element={<P6ElectricCircuitExperiment1ScienceSkills />}
      />
      <Route
        path="/p6/electric-circuit/experiment-2/objectives"
        element={<P6ElectricCircuitExperiment2Objectives />}
      />
      <Route
        path="/p6/electric-circuit/experiment-2/skills"
        element={<P6ElectricCircuitExperiment2ScienceSkills />}
      />
      <Route path="/p6/electric-circuit/problem" element={<Navigate to="/p6/electric-circuit/materials" replace />} />
      <Route path="/p6/electric-circuit/materials" element={<P6ElectricCircuitMaterials />} />
      <Route path="/p6/electric-circuit/steps" element={<P6ElectricCircuitSteps />} />
      <Route path="/p6/electric-circuit/sim" element={<P6ElectricCircuitSim />} />
      <Route path="/p6/electric-circuit/result" element={<P6ElectricCircuitResultOverview />} />
      <Route path="/p6/electric-circuit/result-summary" element={<P6ElectricCircuitResults />} />
      <Route path="/p6/electric-circuit/bulb-series-parallel" element={<P6ElectricCircuitBulbSeriesParallel />} />
      <Route path="/p6/electric-circuit/bulb-series-parallel/steps" element={<P6ElectricCircuitBulbSeriesParallelSteps />} />
      <Route path="/p6/electric-circuit/bulb-series-parallel/sim" element={<P6ElectricCircuitBulbSeriesParallelSim />} />
      <Route
        path="/p6/electric-circuit/bulb-series-parallel/summary"
        element={<P6ElectricCircuitBulbSeriesParallelSummary />}
      />
      <Route
        path="/p6/electric-circuit/bulb-series-parallel/result"
        element={<P6ElectricCircuitBulbSeriesParallelResult />}
      />
      <Route path="/p6/electric-circuit/key-summary" element={<P6ElectricCircuitKeySummary />} />

      <Route path="/p6/experiment/electric-generation" element={<P6ElectricGenerationObjectives />} />
      <Route path="/p6/experiment/electric-generation/skills" element={<P6ElectricGenerationScienceSkills />} />
      <Route path="/p6/experiment/electric-generation/vocab" element={<P6ElectricVocab />} />
      <Route path="/p6/experiment/electric-generation/materials" element={<P6ElectricGenerationMaterials />} />
      <Route path="/p6/experiment/electric-generation/steps" element={<P6ElectricGenerationSteps />} />
      <Route path="/p6/experiment/electric-generation/sim" element={<P6ElectricGenerationSim />} />
      <Route path="/p6/experiment/electric-generation/result" element={<P6ElectricGenerationResult />} />
      <Route path="/p6/experiment/electric-generation/summary" element={<P6ElectricGenerationSummary />} />
      <Route path="/p6/experiment/electric-generation/key-summary" element={<P6ElectricGenerationKeySummary />} />
      <Route
        path="/p6/experiment/electric-generation/summary-2"
        element={<P6ElectricGenerationConclusion />}
      />
      <Route
        path="/p6/experiment/electric-generation/summary-3"
        element={<P6ElectricGenerationConclusionQuestion />}
      />

      <Route
        path="/p6/experiment/electric-force-effect/objectives"
        element={<P6ElectricForceEffectObjectives />}
      />
      <Route
        path="/p6/experiment/electric-force-effect/skills"
        element={<P6ElectricForceEffectScienceSkills />}
      />
      <Route path="/p6/experiment/electric-force-effect" element={<P6ElectricForceEffect />} />
      <Route path="/p6/experiment/electric-force-effect/steps" element={<P6ElectricForceEffectSteps />} />
      <Route path="/p6/experiment/electric-force-effect/sim" element={<P6ElectricForceEffectSim />} />
      <Route path="/p6/experiment/electric-force-effect/result" element={<P6ElectricForceEffectResult />} />
      <Route path="/p6/experiment/electric-force-effect/summary" element={<P6ElectricForceEffectResult />} />
      <Route path="/p6/experiment/electric-force-effect/key-summary" element={<P6ElectricForceEffectKeySummary />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
