import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Dodano

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
      <div className="left-group">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>Atelier Noir</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMenu}>Početna</Link></li>
          <li><Link to="/o_nama" onClick={closeMenu}>O nama</Link></li>
          <li><Link to="/ponuda" onClick={closeMenu}>Ponuda</Link></li>
          <li><Link to="/kontakt" onClick={closeMenu}>Kontakt</Link></li>
        </ul>
      </div>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✖" : "☰"}
      </div>
      <div className="auth-buttons">
       {user ? (
  <>
    <Link
      to={user.role === "admin" ? "/admin" : "/korpa"}
      className="btn"
      onClick={closeMenu}
    >
      {user.role === "admin" ? "Admin panel" : "Korpa"}
    </Link>
    <button className="btn" onClick={handleLogout}>Odjavi se</button>
  </>
) : (
  <>
    <Link to="/log-in" className="btn" onClick={closeMenu}>Prijavi se</Link>
    <Link to="/sign-up" className="btn" onClick={closeMenu}>Registruj se</Link>
  </>
)}

      </div>

    </nav>
  );
};

export default Navbar;
