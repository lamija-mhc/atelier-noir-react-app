import React from "react";
import "../css/registracija.css"; 

const Signin = () => {
  return (
    <div className="container">
      <div className="left">
        <h1>Registruj se</h1>
        <div className="form-wrapper">
          <form>
            <input type="text" placeholder="Ime" required />
            <input type="text" placeholder="Prezime" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Lozinka" required />
            <button type="submit">Registruj se</button>
          </form>
          <div className="links">
            Imaš nalog? <a href="/login">Prijavi se</a>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Signin;
