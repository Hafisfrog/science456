import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import SelectGrade from "./pages/SelectGrade";

const OtherRoutes = lazy(() => import("./routes/OtherRoutes"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "grid",
              placeItems: "center",
              fontFamily: "Prompt, sans-serif",
              color: "#0f172a",
              background: "#eaf7fb",
            }}
          >
            กำลังโหลด...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/grades" element={<SelectGrade />} />
          <Route path="/*" element={<OtherRoutes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
