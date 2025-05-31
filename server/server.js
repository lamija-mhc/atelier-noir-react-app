const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Putanje
const DATA_PATH = path.join(__dirname, "client", "src", "data", "data.json");
const USERS_PATH = path.join(__dirname, "users.json");
const CARTS_PATH = path.join(__dirname, "carts.json");

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTE: Products Router (ako koristiš poseban router fajl) ---
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// --- USERS ---
app.get("/api/users", (req, res) => {
  fs.readFile(USERS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korisnika." });

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch {
      res.status(500).json({ error: "Greška pri parsiranju korisnika." });
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

app.get("/api/user-type/:email", (req, res) => {
  const email = req.params.email;

  fs.readFile(USERS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju korisnika." });

    try {
      const users = JSON.parse(data);
      const user = users.find(u => u.email === email);

      if (!user) return res.status(404).json({ error: "Korisnik nije pronađen." });

      res.json({ type: user.admin ? "admin" : "gost" });
    } catch {
      res.status(500).json({ error: "Greška pri parsiranju korisnika." });
    }
  });
});

// --- CART ---
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
app.get("/api/products", (req, res) => {
  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju proizvoda." });

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch {
      res.status(500).json({ error: "Greška pri parsiranju proizvoda." });
    }
  });
});

app.post("/api/products", (req, res) => {
  const noviProizvod = req.body;

  fs.readFile(DATA_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju proizvoda." });

    let products;
    try {
      products = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: "Greška pri parsiranju proizvoda." });
    }

    products.svi.push(noviProizvod);

    fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri čuvanju proizvoda." });
      res.status(201).json({ message: "Proizvod uspješno dodan u 'svi'." });
    });
  });
});

app.post("/api/products/category", (req, res) => {
  const { proizvod, kategorija } = req.body;

  fs.readFile(DATA_PATH, "utf8", (err, data) => {
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

    fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri upisu proizvoda." });
      res.status(201).json({ message: `Proizvod uspješno dodat u '${kategorija}'.` });
    });
  });
});

// --- DINAMIČNI MENI: čitanje/pisanje artikala u kategorije ---
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/api/artikal', (req, res) => {
  const novi = req.body;
  const data = readData();
  data.svi.push(novi);
  writeData(data);
  res.json({ message: 'Artikal dodan' });
});

app.put('/api/dodaj/:kategorija', (req, res) => {
  const { kategorija } = req.params;
  const artikal = req.body;
  const data = readData();

  if (data[kategorija].length >= 4) {
    return res.status(400).json({ error: 'Maksimalno 4 artikla u kategoriji.' });
  }

  const postoji = data[kategorija].some(a => a.naziv === artikal.naziv);
  if (!postoji) {
    data[kategorija].push(artikal);
    writeData(data);
  }

  res.json({ message: `Dodano u ${kategorija}` });
});

app.delete('/api/obrisi/:kategorija/:naziv', (req, res) => {
  const { kategorija, naziv } = req.params;
  const data = readData();

  data[kategorija] = data[kategorija].filter(a => a.naziv !== naziv);
  writeData(data);

  res.json({ message: `Obrisano iz ${kategorija}` });
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));
