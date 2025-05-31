import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Navbar({ isLoggedIn = false, setIsLoggedIn, isAdmin = false, setIsAdmin }) {
  const location = useLocation();

useEffect(() => {
  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  if (setIsLoggedIn) setIsLoggedIn(!!korisnik?.token);
  if (setIsAdmin) setIsAdmin(korisnik?.tip === "admin");
}, [location, setIsAdmin, setIsLoggedIn]);


  function logout() {
    localStorage.removeItem("korisnik");
    if (setIsLoggedIn) setIsLoggedIn(false);
    if (setIsAdmin) setIsAdmin(false);
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Početna</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/log-in">Prijava</Link>
            </li>
            <li>
              <Link to="/register">Registracija</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <button onClick={logout}>Odjava</button>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
