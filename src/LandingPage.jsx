import React from "react";
import { useNavigate } from "react-router-dom";
import kolamImage from "./assets/Kolam.svg";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="kolam-root">
      {/* Rotating Kolam Watermark */}
      <div
        className="kolam-watermark"
        style={{ backgroundImage: `url(${kolamImage})` }}
      />

      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">
          Welcome to <span className="accent">Culture Hub</span>
        </h1>
        <p className="hero-sub">
          Explore, produce, and spread the beauty of Kolam designs. a venue for custom, creativity, and the arts.
        </p>
        <button className="cta" onClick={() => navigate("/gallery")}>
          Explore Designs
        </button>
      </header>

      {/* Features Section */}
      <section className="features">
        <div
          className="card"
          onClick={() => navigate("/learn")}
        >
          <h3>Learn Kolam</h3>
          <p>Step-by-step tutorials for every level.</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/create")}
        >
          <h3>Create Patterns</h3>
          <p>Use digital tools to design your own Kolams.</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/gallery")}
        >
          <h3>Share & Connect</h3>
          <p>Showcase your work and connect with Kolam enthusiasts worldwide.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Kolam World. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
