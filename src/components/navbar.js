// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/style.css"; // ili gdje god ti je CSS

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => setNavActive(!navActive);
  const closeNav = () => setNavActive(false);

  return (
    <nav className={`navbar ${navActive ? "active" : ""}`}>
      <div className="hamburger" onClick={toggleNav}>
        &#9776;
      </div>

      <div className="left-group">
        <div className="logo">Atelier Noir</div>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeNav}>Početna</Link></li>
          <li><Link to="/o_nama" onClick={closeNav}>O nama</Link></li>
          <li><Link to="/ponuda" onClick={closeNav}>Ponuda</Link></li>
          <li><Link to="/kontakt" onClick={closeNav}>Kontakt</Link></li>
        </ul>
      </div>

      <div className="auth-buttons">
        <a href="/registracija/log-in.html" className="btn">Prijava</a>
        <a href="/registracija/sign-up.html" className="btn primary">Registracija</a>
      </div>
    </nav>
  );
};

export default Navbar;
