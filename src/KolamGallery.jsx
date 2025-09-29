// frontend/src/KolamGallery.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./KolamGallery.css";

export default function KolamGallery() {
  const images = [
    "https://t3.ftcdn.net/jpg/05/06/22/56/240_F_506225653_UJySjzlKZSQp5wQKcpM7uHMvyXki9mLM.jpg",
    "https://t4.ftcdn.net/jpg/03/74/64/55/240_F_374645514_mdTSn5sHPjAvf0DUXDtQqkPFpojlvnSX.jpg",
    "https://t3.ftcdn.net/jpg/15/36/63/28/240_F_1536632870_l0N9dca21lblgyLOa4LFaQfr12zR6JaF.jpg",
    "https://t4.ftcdn.net/jpg/05/06/21/39/240_F_506213931_nfpmnfUFrnB5SlZ7tHTHqVKFO3bE4Eq3.jpg",
    "https://t4.ftcdn.net/jpg/01/35/88/21/240_F_135882187_veZXmZLWiIVfTCqYYfN8CoCLYGrHYyyK.jpg",
    "https://t3.ftcdn.net/jpg/04/90/61/32/240_F_490613293_x74izZOwUkTPgs4w0aapYdrBh0CnUyFv.jpg",
    "https://t3.ftcdn.net/jpg/05/07/14/76/240_F_507147634_RB0nH4VIGYfhDmizIuLDAD8x4W2uMZMU.jpg",
    "https://t3.ftcdn.net/jpg/07/02/54/70/240_F_702547077_0o63E1Wzy2j8NxmrXAyF8hpHtjk4PFQz.jpg",
    "https://t4.ftcdn.net/jpg/05/82/01/49/240_F_582014975_dNDyAAtCnszAQUJhe8eW0NHsJuGIxc1Q.jpg",
    "https://t4.ftcdn.net/jpg/04/03/19/51/240_F_403195144_x8EnO9k2a6neiA1zpVyTBEy4FqzbcVcQ.jpg"
  ];


  return (
    <div className="gallery-root">
      <header className="gallery-header">
        <h1>Kolam Designs Gallery</h1>
        <Link to="/" className="back-btn">← Back</Link>
      </header>

      <section className="gallery-grid">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-card">
            <img src={src} alt={`Kolam ${idx + 1}`} />
          </div>
        ))}
      </section>
    </div>
  );
}
