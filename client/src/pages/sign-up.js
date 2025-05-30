import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/registracija.css";

const Signup = () => {
  const navigate = useNavigate();
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noviKorisnik = {
      ime,
      prezime,
      email,
      lozinka,
      role: "guest",
    };

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noviKorisnik),
      });

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(noviKorisnik));
        navigate("/");
      } else {
        setGreska("Registracija nije uspjela.");
      }
    } catch (err) {
      setGreska("Došlo je do greške.");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="form-container">
          <h1>Registracija</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ime"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Prezime"
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Lozinka"
              value={lozinka}
              onChange={(e) => setLozinka(e.target.value)}
              required
            />
            <button type="submit">Registruj se</button>
            {greska && <p className="error">{greska}</p>}
          </form>
          <div className="links">
            <Link to="/login">Već imate nalog? Prijavite se</Link>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Signup;
