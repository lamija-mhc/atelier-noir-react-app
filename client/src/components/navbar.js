import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);
    // Promijeni email na onaj kojim se loguješ kao admin
    setIsAdmin(user?.role === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/"); // vrati na početnu
  };

  const toggleMenu = () => setMenuActive(!menuActive);

  return (
    <nav className={`navbar ${menuActive ? "active" : ""}`}>
      <div className="left-group">
        <ul className="nav-links">
          <li><Link to="/" onClick={() => setMenuActive(false)}>Početna</Link></li>
          <li><Link to="/onama" onClick={() => setMenuActive(false)}>O nama</Link></li>
          <li><Link to="/ponuda" onClick={() => setMenuActive(false)}>Ponuda</Link></li>
          <li><Link to="/kontakt" onClick={() => setMenuActive(false)}>Kontakt</Link></li>
        </ul>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/log-in" className="btn" onClick={() => setMenuActive(false)}>Prijava</Link>
            <Link to="/sign-up" className="btn primary" onClick={() => setMenuActive(false)}>Registracija</Link>
          </>
        ) : (
          <>
            {isAdmin ? (
              <Link to="/admin" className="btn" onClick={() => setMenuActive(false)}>Admin Panel</Link>
            ) : (
              <Link to="/korpa" className="btn" onClick={() => setMenuActive(false)}>Korpa</Link>
            )}
            <button onClick={handleLogout} className="btn">Odjava</button>
          </>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
