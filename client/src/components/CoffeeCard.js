import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CoffeeCard = ({ proizvod, onAddToCart }) => {
  const [kolicina, setKolicina] = useState(1);

  const handleClick = () => {
    const kolicinaInt = parseInt(kolicina);
    if (kolicinaInt >= 1) {
      // Dodajemo jedinstveni ID na proizvod prije slanja u korpu
      const proizvodSaId = {
        ...proizvod,
        kolicina: kolicinaInt,
        id: `${proizvod.naziv}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };
      onAddToCart(proizvodSaId);
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
          <div className="cart-actions">
            <input
              type="number"
              min={1}
              value={kolicina}
              onChange={(e) => setKolicina(e.target.value)}
              style={{ width: "60px", marginRight: "1rem" }}
            />
            <button onClick={handleClick} className="btn btn-cart">
              +<FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
