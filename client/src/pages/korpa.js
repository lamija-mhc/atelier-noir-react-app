import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Korpa = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [greska, setGreska] = useState("");
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  const fetchCart = () => {
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
      })
      .catch(() => {
        setGreska("Greška pri povezivanju sa serverom.");
      });
  };

  useEffect(() => {
    if (!email) {
      setLoading(false);
      setGreska("Morate biti prijavljeni da biste vidjeli korpu.");
      return;
    }
    fetchCart();
    setLoading(false);
  }, [email]);

  const handleDelete = (id) => {
    console.log("Brisanje proizvoda sa id:", id);
    fetch(`http://localhost:5000/api/cart/${email}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Odgovor backend-a:", data);
        if (data.success) {
          fetchCart(); // ponovo učitaj korpu
        } else {
          alert("Brisanje nije uspjelo.");
        }
      })
      .catch((err) => {
        console.error("Greška pri brisanju:", err);
      });
  };

  const handleCheckout = () => {
    navigate("/thank-you");
  };

  // Izračun ukupne cijene
  const ukupno = proizvodi.reduce((sum, p) => {
    const cijenaBroj = parseFloat(p.cijena.replace("$", ""));
    return sum + cijenaBroj * (p.kolicina || 1);
  }, 0);

  if (loading) return <p>Učitavanje korpe...</p>;
  if (greska) return <p style={{ color: "red" }}>{greska}</p>;

  return (
    <div className="korpa-container">
      <h2>Korpa</h2>
      <ul className="korpa-lista">
        {proizvodi.length === 0 ? (
          <li>Korpa je prazna</li>
        ) : (
          proizvodi.map((p) => (
            <li key={p.id} className="korpa-stavka">
              <img src={p.slika} alt={p.naziv} className="korpa-slika" />
              <div className="korpa-info">
                <p>
                  {p.naziv} x {p.kolicina}
                </p>
                <p className="cijena">
                  $
                  {(parseFloat(p.cijena.replace("$", "")) * (p.kolicina || 1)).toFixed(2)}
                </p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                ✖
              </button>
            </li>
          ))
        )}
      </ul>

      {proizvodi.length > 0 && (
        <>
          <div className="ukupno">Ukupno: ${ukupno.toFixed(2)}</div>
          <button className="checkout-dugme" onClick={handleCheckout}>
            Nastavi na plaćanje
          </button>
        </>
      )}
    </div>
  );
};

export default Korpa;
