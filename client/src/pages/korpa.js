import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Korpa = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

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
          setGreska("");
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

  const handleCheckout = () => {
    // Kad klikneš nastavi, vodi na dummy thank-you stranicu
    navigate("/thank-you");
  };

  if (loading) return <p>Učitavanje korpe...</p>;
  if (greska) return <p style={{ color: "red" }}>{greska}</p>;

  return (
    <div className="korpa-container">
      <h2>Korpa</h2>
      <ul className="korpa-lista">
        {proizvodi.length === 0 ? (
          <li>Korpa je prazna</li>
        ) : (
          proizvodi.map((p, i) => (
            <li key={i} className="korpa-stavka">
              {p.naziv} x {p.kolicina}
            </li>
          ))
        )}
      </ul>

      {proizvodi.length > 0 && (
        <button className="checkout-dugme" onClick={handleCheckout}>
          Nastavi na plaćanje
        </button>
      )}
    </div>
  );
};

export default Korpa;
