import React from "react";
import "../css/registracija.css"; 

const Login = () => {
  return (
    <div className="container">
      <div className="left">
        <h1>Prijavi se</h1>
        <div className="form-wrapper">
          <div className="google-btn">
            <img src="/images/google.png" alt="Google logo" />
            Nastavi sa Google računom
          </div>
          <p>ili</p>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Lozinka" required />
            <button type="submit">Prijavi se</button>
          </form>
          <div className="links">
            <a href="#">Zaboravljena šifra?</a>
            <span> Nemaš profil? <a href="/sign-up">Napravi nalog</a></span>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
