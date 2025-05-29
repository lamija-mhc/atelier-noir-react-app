import React from "react";
import "../css/style.css";

const ONama = () => {
  return (
    <>


      <section className="nasa-prica-pozadina">
        <div className="hero-content">
          <img className="logo2" src="/images/logo2.png" alt="Logo 2" />
          <h2 className="subtitle">Premium coffee · Est. 1921</h2>
          <h1>Naša priča</h1>
          <img className="separator" src="/images/separator.png" alt="Separator" />
          <p style={{ fontSize: "2rem", color: "#A38560" }}>
            Strast prema kafi. Elegancija u svakoj šoljici.
          </p>
        </div>
      </section>

      <section className="about-main">
        <div className="about-text">
          <h2>Od Bosne i Hercegovine do Etiopije</h2>
          <h2>biramo samo najbolje</h2>
          <img className="separator" src="/images/separator.png" alt="Separator" />
          <p>
            Atelier Noir nije samo brend – to je filozofija. Ujedinjujemo mirise i ukuse različitih kultura kroz pažljivo odabrane kafe iz cijelog svijeta. Naši eksperti posjećuju najudaljenije farme u Kolumbiji, Etiopiji, Vijetnamu i Brazilu, kako bi pronašli ono što nazivamo "dušom zrna".
          </p>
          <p>
            Naš proces prženja je kombinacija nauke i umjetnosti – i svaka šoljica je dokaz toga. Vjerujemo u ritual kafe – u trenutke tišine, razgovora, inspiracije. Zato Atelier Noir postoji.
          </p>
        </div>

        <div className="about-gallery">
          <img src="/images/kasikakafe.jpg" alt="Kafa" />
          <img src="/images/roasting.jpg" alt="Proces prženja" />
          <img src="/images/kafa3.jpg" alt="Elegantna šoljica kafe" />
        </div>
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

export default ONama;
