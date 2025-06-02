import React, { useEffect, useState } from "react";

const Korpa = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) {
      setLoading(false);
      setGreska("Morate biti prijavljeni da biste vidjeli korpu.");
      return;
    }

    fetch(`http://localhost:5000/api/cart/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setGreska(data.error);
          setProizvodi([]);
        } else if (data.proizvodi && Array.isArray(data.proizvodi)) {
          setProizvodi(data.proizvodi);
        } else {
          setGreska("Neočekivan odgovor sa servera.");
          setProizvodi([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setGreska("Došlo je do greške prilikom učitavanja korpe.");
        setProizvodi([]);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <p>Učitavanje korpe...</p>;
  if (greska) return <p style={{ color: "red" }}>{greska}</p>;

  return (
    <div>
      <h2>Korpa</h2>
      <ul>
        {proizvodi.length === 0 ? (
          <li>Korpa je prazna</li>
        ) : (
          proizvodi.map((p, i) => (
            <li key={i}>
              {p.naziv} x {p.kolicina}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Korpa;
