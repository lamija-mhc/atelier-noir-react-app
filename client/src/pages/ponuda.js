import React, { useState } from "react";
import data from "../data/data.json"; // Provjeri putanju

// Definicija CoffeeCard komponente
const CoffeeCard = ({ proizvod }) => {
  const handleAddToCart = () => {
    console.log(`Dodano u korpu: ${proizvod.naziv}`);
    // Ovdje ćeš kasnije dodavati logiku za korpu
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
          <button onClick={handleAddToCart} className="btn btn-cart">
            Dodaj u korpu
          </button>
        </div>
      </div>
    </div>
  );
};


const Ponuda = () => {
  const [prikaziSve, setPrikaziSve] = useState(false);

  // Prikazujemo ili prvih 4 ili sve proizvode
  const proizvodiZaPrikaz = prikaziSve ? data.svi : data.svi.slice(0, 4);

  return (
    <>
      {/* Hero section */}
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

      {/* Recommended */}
      <section className="selection">
        <h2>Naše preporuke</h2>
        <img className="separator" src="/images/separator.png" alt="Separator" />
        <div className="coffee-cards" id="recommended">
          {data.preporuke.map((proizvod, index) => (
            <CoffeeCard key={index} proizvod={proizvod} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
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
            <CoffeeCard key={index} proizvod={proizvod} />
          ))}
        </div>
      </section>

      {/* All Products */}
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
            <CoffeeCard key={index} proizvod={proizvod} />
          ))}
        </div>

        {!prikaziSve && data.svi.length > 4 && (
          <button
            className="btn"
            id="show-all"
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
            onClick={() => setPrikaziSve(true)}
          >
            Prikaži sve
          </button>
        )}

        {prikaziSve && (
          <button
            className="btn"
            style={{ marginTop: "3rem", marginBottom: "3rem" }}
            onClick={() => setPrikaziSve(false)}
          >
            Prikaži manje
          </button>
        )}
      </section>

      {/* Footer */}
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
