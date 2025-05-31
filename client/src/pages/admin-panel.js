import React, { useState } from "react";

const AdminPanel = () => {
  const [naziv, setNaziv] = useState("");
  const [cijena, setCijena] = useState("");
  const [opis, setOpis] = useState("");
  const [kategorija, setKategorija] = useState("preporuke");
  const [slika, setSlika] = useState("");
  const [poruka, setPoruka] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noviProizvod = {
      naziv,
      cijena,
      opis,
      slika,
    };

    try {
      // 1. Dodaj u "svi"
      await fetch("http://localhost:5000/api/artikal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noviProizvod),
      });

      // 2. Dodaj u odabranu kategoriju
      const response = await fetch("http://localhost:5000/api/products/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proizvod: noviProizvod, kategorija }),
      });

      if (response.ok) {
        setPoruka("✅ Proizvod je uspješno dodat!");
        setNaziv("");
        setCijena("");
        setOpis("");
        setSlika("");

        // Automatski reload stranice da bi se prikazale nove promjene
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setPoruka("❌ Greška pri dodavanju proizvoda.");
      }
    } catch (error) {
      console.error("Greška:", error);
      setPoruka("❌ Došlo je do greške.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Dodaj novi proizvod</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Naziv"
          value={naziv}
          onChange={(e) => setNaziv(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Cijena"
          value={cijena}
          onChange={(e) => setCijena(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Opis"
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Link slike"
          value={slika}
          onChange={(e) => setSlika(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={kategorija}
          onChange={(e) => setKategorija(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="preporuke">Preporuke</option>
          <option value="best">Najprodavanije</option>
          <option value="sweet">Slatke kafe</option>
          <option value="strong">Jake kafe</option>
          <option value="new">Nove kafe</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Dodaj proizvod
        </button>
      </form>
      {poruka && <p className="mt-2 text-center">{poruka}</p>}
    </div>
  );
};

export default AdminPanel;
