import React from "react";
import { useNavigate } from "react-router-dom";
import "./LearnKolam.css";
import kolamExample from "./assets/kolam_example.svg"; // Replace with actual Kolam image

function LearnKolam() {
  const navigate = useNavigate();

  return (
    <div className="learn-root">
      {/* Header / Navigation */}
      <header className="learn-header">
        <h1>Learn Kolam</h1>
        <div>
          <button onClick={() => navigate("/")} className="nav-btn">Home</button>
          <button onClick={() => navigate("/create")} className="nav-btn">Create Kolam</button>
        </div>
      </header>

      {/* Introduction */}
      <section className="lesson">
        <h2>Introduction to Kolam</h2>
        <p>
          Kolams are traditional South Indian art forms made by drawing continuous lines around
          a set of dots (Pullis). They are drawn daily as a cultural practice and are also a
          powerful way to explore geometry, symmetry, and algorithmic thinking.
        </p>
        <p>
          Pulli Kolam follows 3 essential rules:
        </p>
        <ul>
          <li>All lines must form closed loops.</li>
          <li>All dots must be encircled.</li>
          <li>Lines cannot overlap over a finite length.</li>
        </ul>
      </section>

      {/* Cultural Context */}
      <section className="lesson">
        <h2>Culture and Process</h2>
        <p>
          Traditionally, women draw Kolams every morning using rice flour on freshly cleaned floors.
          Kolams are seen as offerings to the earth goddess Bhudevi and often symbolize prosperity.
        </p>
        <p>
          Artists may use multiple colors to indicate different loops and layers, making complex patterns
          easier to understand.
        </p>
        <img src={kolamExample} alt="Kolam Example" className="kolam-image"/>
      </section>

      {/* Methodology */}
      <section className="lesson">
        <h2>Methodology & Rules</h2>
        <p>
          Two main coding approaches for Kolams:
        </p>
        <ol>
          <li>
            <strong>Looping Kolams:</strong> Place dots in a grid and use continuous lines (loops)
            to connect them. Curves are drawn smoothly without right angles.
          </li>
          <li>
            <strong>Kolam Cartesian / Shapes:</strong> Represent tiles with curved sides as 0 or 1.
            Place tiles in a diagonal grid to maintain symmetry and single-line drawing rules.
          </li>
        </ol>

        <p><strong>Rules for Pulli Kolam:</strong></p>
        <ul>
          <li>Lines never retrace the same route.</li>
          <li>All points are enclosed by lines.</li>
          <li>Lines drawn diagonally at 45° angles.</li>
          <li>Lines are smooth, with arcs surrounding the points.</li>
        </ul>
      </section>

      {/* Mathematical & Coding Insights */}
      <section className="lesson">
        <h2>Mathematical Insights</h2>
        <p>
          Kolams illustrate fractals, symmetry, and space-filling curves. They can also be
          translated into arrays or coded algorithms, preserving traditional rules in digital form.
        </p>
        <p>
          Coding Kolams allows exploration of geometry, iterative patterns, and visual mathematics,
          bridging culture and computational thinking.
        </p>
      </section>

      {/* Examples */}
      <section className="lesson">
        <h2>Examples of Kolams</h2>
        <p>Below are some sample Kolam patterns that follow 4-fold symmetry:</p>
        <div className="example-grid">
          <img src={"https://t4.ftcdn.net/jpg/03/99/73/75/240_F_399737504_kN6DP384bGQ6vLsH7TYAV7F3I6IFgv8G.jpg"} alt="Kolam Example 1"/>
          <img src={"https://t4.ftcdn.net/jpg/03/74/64/55/240_F_374645544_ssaSaRxHa8gqxooM4AICXSVqJL6snOYV.jpg"} alt="Kolam Example 2"/>
          <img src={"https://t4.ftcdn.net/jpg/09/72/73/87/240_F_972738716_ij69wUZSev0vJk892CFrB8rqKWkWJTl0.jpghttps://t3.ftcdn.net/jpg/03/74/64/54/240_F_374645477_p1JULxOh4E7J9UrFgyS8REygm0B5pdDU.jpg"} alt="Kolam Example 3"/>
        </div>
      </section>

      {/* Interactive Learning CTA */}
      <section className="get-started">
        <h2>Ready to Create Your Kolam?</h2>
        <p>Use our digital tools to design your own Kolam and explore symmetry and geometry!</p>
        <button className="create-btn" onClick={() => navigate("/create")}>
          Start Creating
        </button>
      </section>
    </div>
  );
}

export default LearnKolam;
