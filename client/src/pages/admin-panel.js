import React, { useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [proizvod, setProizvod] = useState({
    naziv: "",
    cijena: "",
    slika: "",
    opis: "",
  });

  const [kategorija, setKategorija] = useState("");

  const handleInputChange = (e) => {
    setProizvod({
      ...proizvod,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", proizvod);
      alert("Proizvod uspješno dodat u 'svi'!");
    } catch (err) {
      alert("Greška pri dodavanju proizvoda.");
    }
  };

  const handleAddToCategory = async () => {
    try {
      await axios.post("http://localhost:5000/api/products/category", {
        proizvod,
        kategorija,
      });
      alert(`Proizvod dodat u kategoriju '${kategorija}'`);
    } catch (err) {
      alert("Greška pri dodavanju u kategoriju.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
      <h2>Admin Panel</h2>

      <input
        type="text"
        name="naziv"
        placeholder="Naziv"
        value={proizvod.naziv}
        onChange={handleInputChange}
      />
      <br />

      <input
        type="text"
        name="cijena"
        placeholder="Cijena"
        value={proizvod.cijena}
        onChange={handleInputChange}
      />
      <br />

      <input
        type="text"
        name="slika"
        placeholder="URL slike"
        value={proizvod.slika}
        onChange={handleInputChange}
      />
      <br />

      <textarea
        name="opis"
        placeholder="Opis"
        value={proizvod.opis}
        onChange={handleInputChange}
      />
      <br />

      <button onClick={handleAddProduct}>Dodaj u 'svi'</button>

      <hr />

      <input
        type="text"
        placeholder="Kategorija (npr. preporuke)"
        value={kategorija}
        onChange={(e) => setKategorija(e.target.value)}
      />
      <br />

      <button onClick={handleAddToCategory}>Dodaj u kategoriju</button>
    </div>
  );
};

export default AdminPanel;
