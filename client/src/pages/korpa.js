import React, { useEffect, useState } from "react";

const Korpa = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:5000/api/cart/${user.email}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch(() => setCartItems([]));
  }, [user]);

  return (
    <div>
      <h1>Korpa korisnika: {user?.email}</h1>
      {cartItems.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>{item.name} - {item.price} KM</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Korpa;
