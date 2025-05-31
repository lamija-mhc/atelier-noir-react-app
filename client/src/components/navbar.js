import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
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
  };

  return (
    <nav className="navbar">
      <div className="left-group">
        <div className="logo">
          <Link to="/" className="logo">Atelier Noir</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Početna</Link></li>
          <li><Link to="/o_nama">O nama</Link></li>
          <li><Link to="/ponuda">Ponuda</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          {user && user.role === "admin" && (
            <li><Link to="/admin">Admin</Link></li>
          )}
          {user && user.role !== "admin" && (
            <li><Link to="/korpa">Korpa</Link></li>
          )}
        </ul>
      </div>

      <div className="auth-buttons">
        {user ? (
          <button className="btn primary" onClick={handleLogout}>Odjavi se</button>
        ) : (
          <>
            <Link to="/log-in" className="btn">Prijavi se</Link>
            <Link to="/sign-up" className="btn primary">Registruj se</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
