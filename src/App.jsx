import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import LearnKolam from "./LearnKolam";
import KolamGallery from "./KolamGallery";
import CreateKolam from "./CreateKolam";
import PulliKolamGenerator from "./PulliKolamGenerator"; // Fixed import

export default function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn" element={<LearnKolam />} />
        <Route path="/gallery" element={<KolamGallery />} />
        <Route path="/create" element={<PulliKolamGenerator />} /> {/* Fixed JSX */}
      </Routes>
    </Router>
  );
}