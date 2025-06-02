import React, { useState } from "react";

const CoffeeCard = ({ proizvod, onAddToCart }) => {
  const [kolicina, setKolicina] = useState(1);

  const handleClick = () => {
    const kolicinaInt = parseInt(kolicina);
    if (kolicinaInt >= 1) {
      onAddToCart(proizvod, kolicinaInt);
    } else {
      alert("Unesite validnu količinu.");
    }
  };

  return (
    <div className="coffee-card">
      <div className="card-image">
        <img src={proizvod.slika} alt={proizvod.naziv} />
      </div>
      <div className="card-content">
        <h3>{proizvod.naziv}</h3>
        <p className="card-description">{proizvod.opis}</p>
        <p className="card-weight">Težina: {proizvod.gramaza}</p>
        <div className="card-bottom">
          <span className="cijena">{proizvod.cijena}</span>
          <input
            type="number"
            min={1}
            value={kolicina}
            onChange={(e) => setKolicina(e.target.value)}
            style={{ width: "50px", marginRight: "10px" }}
          />
          <button onClick={handleClick} className="btn btn-cart">
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
