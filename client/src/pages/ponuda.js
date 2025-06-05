import React, { useState } from "react";
import data from "../data/data.json";
import CoffeeCard from "../components/CoffeeCard";

const Ponuda = () => {
  const [prikaziSve, setPrikaziSve] = useState(false);

const handleAddToCart = async (proizvod, kolicina) => {
  const userEmail = localStorage.getItem("userEmail");

  if (!userEmail) {
    alert("Niste prijavljeni!");
    return;
  }

  try {
    // Backend očekuje POST na /api/cart/:email
    const response = await fetch(`http://localhost:5000/api/cart/${encodeURIComponent(userEmail)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...proizvod, kolicina }),
    });

    const result = await response.json();

    // Backend u tvom kodu vraća { message: "..."} a ne { success: true }
    if (response.ok) {
      alert(result.message || "Proizvod je uspješno dodat u korpu!");
    } else {
      alert("Greška: " + (result.error || "Nepoznata greška"));
    }
  } catch (error) {
    console.error("Greška pri dodavanju u korpu:", error);
    alert("Došlo je do greške prilikom dodavanja u korpu.");
  }
};


  const proizvodiZaPrikaz = prikaziSve ? data.svi : data.svi.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <img className="logo2" src="/images/logo2.png" alt="Atelier Noir Logo" />
          <h2 className="subtitle">Premium coffee · Est. 1921</h2>
          <h1>Naša ponuda</h1>
          <img className="separator" src="/images/separator.png" alt="Separator" />
          <p style={{ fontSize: "2rem", color: "#A38560" }}>
            Izaberi kvalitet, uživaj u ritualu.
          </p>
        </div>
      </section>

      <section className="selection">
        <h2>Naše preporuke</h2>
        <img className="separator" src="/images/separator.png" alt="Separator" />
        <div className="coffee-cards" id="recommended">
          {data.preporuke.map((proizvod, index) => (
            <CoffeeCard key={index} proizvod={proizvod} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section
        className="selection"
        style={{
          backgroundImage: `
            linear-gradient(
                to right,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0.6) 55%,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(0, 0, 0, 0.6) 55%,
                rgba(0, 0, 0, 1) 100%
            ),
            url(/images/pozadina2.png)
            `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>Best Selleri</h2>
        <img className="separator" src="/images/separator.png" alt="Separator" />
        <div className="coffee-cards" id="bestsellers">
          {data.best.map((proizvod, index) => (
            <CoffeeCard key={index} proizvod={proizvod} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section
        className="selection"
        style={{
          backgroundImage: `
            linear-gradient(
                to top,
                rgba(0, 0, 0, 1) 0%,
                rgba(0, 0, 0, 0) 0%
            ),
            url(/images/pozadina3.png)
            `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>Svi Proizvodi</h2>
        <img className="separator" src="/images/separator.png" alt="Separator" />
        <div className="coffee-cards" id="all-products">
          {proizvodiZaPrikaz.map((proizvod, index) => (
            <CoffeeCard key={index} proizvod={proizvod} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {!prikaziSve && data.svi.length > 4 && (
          <button
            className="btn"
           style={{
              marginTop: "3rem",
              marginBottom: "3rem",
              backgroundColor: "#552216",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "auto",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}
            onClick={() => setPrikaziSve(true)}
          >
            Prikaži sve
          </button>
        )}

        {prikaziSve && (
          <button
            className="btn"
            style={{
              marginTop: "3rem",
              marginBottom: "3rem",
              backgroundColor: "#552216",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "auto",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}

            onClick={() => setPrikaziSve(false)}
          >
            Prikaži manje
          </button>
        )}
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-column">
            <h4>Proizvodi</h4>
            <p>Auctor volutpat</p>
            <p>Fermentum turpis</p>
          </div>
          <div className="footer-column">
            <h4>Get the app</h4>
            <div className="app-icons">
              <img src="/images/appstore.png" alt="App Store" />
              <img src="/images/googleplay.png" alt="Google Play" />
            </div>
          </div>
          <div className="footer-column">
            <h4>Kontaktirajte nas</h4>
            <p>ateliernoir@gmail.com</p>
            <p>+387 62 848 557</p>
            <p>Štrosmajerova, Zenica</p>
          </div>
        </div>
        <div className="bottom-footer">
          <img src="/images/logo3.png" alt="Atelier Noir Logo" />
          <p>© 2025 Atelier Noir. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Ponuda;
