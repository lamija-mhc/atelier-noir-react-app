import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => (
  <div style={{
    textAlign: "center",
    padding: "100px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#333"
  }}>
    <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>404 - Stranica nije pronađena</h1>
    <p style={{ fontSize: "20px", marginBottom: "40px" }}>
      Izgleda da stranica koju tražite ne postoji ili je premještena.
    </p>
    <Link to="/">
      <button style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px 30px",
        fontSize: "18px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
      }}
      onMouseOver={e => e.currentTarget.style.backgroundColor = "#0056b3"}
      onMouseOut={e => e.currentTarget.style.backgroundColor = "#007bff"}
      >
        Vrati se na početnu
      </button>
    </Link>
  </div>
);

export default Page404;
