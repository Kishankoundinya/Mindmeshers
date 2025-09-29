import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import LearnKolam from "./LearnKolam";
import KolamGallery from "./KolamGallery";
import CreateKolam from "./CreateKolam";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn" element={<LearnKolam />} />
        <Route path="/gallery" element={<KolamGallery />} />
        <Route path="/create" element={<CreateKolam />} />
      </Routes>
    </Router>
  );
}
