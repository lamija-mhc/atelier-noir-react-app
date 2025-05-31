import React, { useEffect, useState } from "react";
import React from "react";
import data from "../data/data.json"; // Provjeri putanju

const Ponuda = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {products.map((p) => (
        <div key={p.id} className="coffee-card">
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>{p.price} KM</p>
        </div>
      ))}
    </div>
  );
};

export default Ponuda;
