import React, { useState } from "react";
import "../css/style.css";

const Kontakt = () => {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [poruka, setPoruka] = useState("");
  const [greska, setGreska] = useState("");
  const [uspjeh, setUspjeh] = useState("");

  const validateEmail = (email) => {
    // Jednostavna regex provjera emaila
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGreska("");
    setUspjeh("");

    if (!ime.trim() || !email.trim() || !poruka.trim()) {
      setGreska("Sva polja su obavezna.");
      return;
    }

    if (!validateEmail(email)) {
      setGreska("Unesite validnu email adresu.");
      return;
    }

    // Ovdje možeš poslati podatke na backend ili API

    setUspjeh("Poruka je uspješno poslata! Hvala na kontaktu.");
    setIme("");
    setEmail("");
    setPoruka("");
  };

  return (
    <>
      <section className="contact">
        <div className="contact-content">
          <h2>Kontaktirajte nas</h2>
          <img
            className="separator"
            src="/images/separator.png"
            alt="Separator"
          />
          <p>
            Imate pitanje ili želite sarađivati? Javite nam se putem forme ili
            posjetite našu lokaciju.
          </p>

          <div className="contact-wrapper">
            {/* Google Mapa */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2870.090424983372!2d17.90580207582524!3d44.20509457369071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475eecf0d2507c69%3A0x47984bbce1b8dce1!2s%C5%A0trosmajerova%20ul.%2C%20Zenica%2072000!5e0!3m2!1sbs!2sba!4v1716631932049!5m2!1sbs!2sba"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa lokacije"
              ></iframe>
            </div>

            {/* Kontakt forma */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                placeholder="Vaše ime"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Vaš email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Vaša poruka"
                rows="5"
                value={poruka}
                onChange={(e) => setPoruka(e.target.value)}
                required
              ></textarea>

              {greska && <p style={{ color: "#b51818" }}>{greska}</p>}
              {uspjeh && <p style={{ color: "#157810" }}>{uspjeh}</p>}

              <button type="submit" className="btn primary">
                Pošalji poruku
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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

export default Kontakt;
