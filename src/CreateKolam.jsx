import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreateKolam.css";

const GRID_SIZE = 10; // 10x10 grid

export default function CreateKolam() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
  );

  const toggleCell = (row, col) => {
    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? !cell : cell))
    );
    setGrid(newGrid);
  };

  return (
    <div className="create-root">
      <header className="create-header">
        <h1>Create Your Kolam</h1>
        <Link to="/" className="back-btn">← Back</Link>
      </header>

      <div className="grid-container">
        {grid.map((row, i) => (
          <div key={i} className="grid-row">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`grid-cell ${cell ? "active" : ""}`}
                onClick={() => toggleCell(i, j)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
