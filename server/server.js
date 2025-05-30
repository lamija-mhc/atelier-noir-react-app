const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- USERS ---
const USERS_PATH = path.join(__dirname, "users.json");

app.get("/api/users", (req, res) => {
  fs.readFile(USERS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korisnika." });

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju korisnika." });
    }
  });
});

app.post("/api/users", (req, res) => {
  const noviKorisnik = req.body;

  fs.readFile(USERS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korisnika." });

    let users;
    try {
      users = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju korisnika." });
    }

    const postoji = users.find(u => u.email === noviKorisnik.email);
    if (postoji) return res.status(400).json({ error: "Korisnik već postoji." });

    users.push(noviKorisnik);

    fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri čuvanju korisnika." });
      res.status(201).json({ message: "Korisnik uspješno dodan." });
    });
  });
});

// --- CART ---
const CARTS_PATH = path.join(__dirname, "carts.json");

app.get("/api/cart/:email", (req, res) => {
  fs.readFile(CARTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korpe." });

    let carts = [];
    try {
      carts = JSON.parse(data);
    } catch {
      carts = [];
    }

    const userCart = carts.find(c => c.email === req.params.email);
    res.json(userCart ? userCart.items : []);
  });
});

app.post("/api/cart/:email", (req, res) => {
  const email = req.params.email;
  const item = req.body;

  fs.readFile(CARTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korpe." });

    let carts = [];
    try {
      carts = JSON.parse(data);
    } catch {
      carts = [];
    }

    let userCart = carts.find(c => c.email === email);

    if (userCart) {
      userCart.items.push(item);
    } else {
      carts.push({ email, items: [item] });
    }

    fs.writeFile(CARTS_PATH, JSON.stringify(carts, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri čuvanju korpe." });
      res.json({ message: "Artikal dodat u korpu." });
    });
  });
});

// --- PRODUCTS ---
const PRODUCTS_PATH = path.join(__dirname, "public", "data.json");

// GET svi proizvodi
app.get("/api/products", (req, res) => {
  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju proizvoda." });

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju proizvoda." });
    }
  });
});

// POST - dodaj proizvod u "svi"
app.post("/api/products", (req, res) => {
  const noviProizvod = req.body;

  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju proizvoda." });

    let products;
    try {
      products = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju proizvoda." });
    }

    products.svi.push(noviProizvod);

    fs.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri čuvanju proizvoda." });
      res.status(201).json({ message: "Proizvod uspješno dodan u 'svi'." });
    });
  });
});

// POST - dodaj proizvod u određenu kategoriju
app.post("/api/products/category", (req, res) => {
  const { proizvod, kategorija } = req.body;

  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju proizvoda." });

    let products;
    try {
      products = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju proizvoda." });
    }

    if (!products[kategorija]) {
      return res.status(400).json({ error: "Kategorija ne postoji." });
    }

    const postoji = products[kategorija].some(p => p.naziv === proizvod.naziv);
    if (postoji) return res.status(400).json({ error: "Već postoji u toj kategoriji." });

    products[kategorija].push(proizvod);

    fs.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri upisu proizvoda." });
      res.status(201).json({ message: `Proizvod uspješno dodat u '${kategorija}'.` });
    });
  });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server pokrenut na http://localhost:${PORT}`);
});
