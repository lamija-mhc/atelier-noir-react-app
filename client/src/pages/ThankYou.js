import React from "react";
import kafaImage from "../images/kafa3.jpg"; // prilagodi put prema stvarnoj lokaciji

const ThankYou = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Lijeva polovina */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1>Hvala na narudžbi!</h1>
        <p>Vaša porudžbina je zaprimljena i uskoro će biti obrađena.</p>
      </div>

      {/* Desna polovina */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${kafaImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default ThankYou;
