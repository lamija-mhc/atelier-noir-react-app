import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Counter from "./components/counter";
import Navbar from "./components/navbar.js";
import ONama from "./pages/o_nama";
import Kontakt from "./pages/kontakt";
import Ponuda from "./pages/ponuda";
import Signup from "./pages/sign-up.js";
import Login from "./pages/log-in";
import Korpa from "./pages/korpa";
import AdminPanel from "./pages/admin-panel";
import ThankYou from "./pages/ThankYou";
import Page404 from "./pages/404page";
import ScrollToTop from "./components/ScrollToTop";

import "./css/style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/o_nama" element={<ONama />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/ponuda" element={<Ponuda />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/korpa" element={<Korpa />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <img className="logo2" src="./images/logo2.png" alt="Logo" />
          <h2 className="subtitle">Premium coffee · Est. 1921</h2>
          <h1>ATELIER NOIR</h1>
          <img className="separator" src="./images/separator.png" alt="Separator" />
          <p style={{ fontSize: "2rem", color: "#A38560" }}>
            Ručno birana zrna. Bezvremenska elegancija.
            <br />
            Kafa za one koji prepoznaju istinsku vrijednost rituala.
          </p>
          <Link to="/ponuda" className="btn primary">Istražite ponudu</Link>
        </div>
      </section>

      {/* Selection */}
      <section className="selection">
        <h2>Naša pažljivo odabrana selekcija</h2>
        <img className="separator" src="./images/separator.png" alt="Separator" />
        <div className="selection-slika">
          <img style={{ marginBottom: "2rem" }} src="images/selection.png" alt="Bosna i Hercegovina" />
        </div>
        <Link to="/ponuda" className="btn primary">Istražite ponudu</Link>
      </section>

      {/* About */}
      <section className="about">
        <h2>O nama</h2>
        <img src="./images/separator.png" alt="Separator" />
        <div className="about-content">
          <img src="images/farmer1.png" alt="Branje kafe" />
          <p className="o_nama">
            U srcu planina Kolumbije, Luca Moreno stvorio je Atelier Noir iz strasti prema umjetnosti kafe. 
            Svaka šoljica naše premium kafe donosi autentičnost organskog uzgoja i ručne obrade, 
            kombinujući prošlost i budućnost u svakom gutljaju.
          </p>
          <img src="images/farmer2.png" alt="Proizvođač kafe" />
        </div>
        <Link to="/o_nama" className="btn primary">Saznajte više</Link>
      </section>

      {/* Stats */}
      <section className="stats">
        <h2 className="stats-title">Atelier Noir u brojkama</h2>
        <img src="./images/separator.png" alt="Separator" />

        <div className="stats-wrapper">
          <div className="stats-logo">
            <img src="images/logo2.png" alt="Atelier Noir logo" />
            <h3>Premium Coffee · Est. 1921</h3>
          </div>

          <div className="stats-numbers">
            <div>
              <Counter target={10214} start={10000} duration={1000} />
              <p>Prodanih šoljica kafe</p>
            </div>
            <div>
              <Counter target={5} start={0} duration={1000} />
              <p>Zvjezdica na reviews</p>
            </div>
            <div>
              <Counter target={25} start={0} duration={1000} />
              <p>Saradnji širom svijeta</p>
            </div>
            <div>
              <Counter target={104} start={0} duration={1000} />
              <p>Godine postojanja</p>
            </div>
          </div>
        </div>

        <div className="stats-call-to-action">
          <p>Želite biti dio naše priče?</p>
          <Link to="/kontakt" className="btn primary">Kontaktirajte nas</Link>
        </div>
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
              <img src="./images/appstore.png" alt="App Store" />
              <img src="./images/googleplay.png" alt="Google Play" />
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
          <img src="./images/logo3.png" alt="Atelier Noir Logo" />
          <p>© 2025 Atelier Noir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
