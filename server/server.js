const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Putanje do fajlova
const DATA_PATH = path.join(__dirname, "..", "client", "src", "data", "data.json");
const USERS_PATH = path.join(__dirname, "users.json");
const CARTS_PATH = path.join(__dirname, "carts.json");

// Middleware
app.use(cors());
app.use(express.json());

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
    if (users.find(u => u.email === noviKorisnik.email)) {
      return res.status(400).json({ error: "Korisnik već postoji." });
    }
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
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// Vrati sve proizvode
app.get("/api/products", (req, res) => {
  try {
    const products = readData();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju proizvoda." });
  }
});

// Vrati proizvode iz 'svi' kategorije
app.get("/api/products/svi", (req, res) => {
  try {
    const products = readData();
    res.json(products.svi || []);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju proizvoda." });
  }
});
// Vrati proizvode iz 'preporuke' kategorije
app.get("/api/products/preporuke", (req, res) => {
  try {
    const products = readData();
    res.json(products.preporuke || []);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju preporuka." });
  }
});

// Vrati proizvode iz 'best' kategorije
app.get("/api/products/best", (req, res) => {
  try {
    const products = readData();
    res.json(products.best || []);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju best proizvoda." });
  }
});

// Dodaj proizvod samo u 'svi' kategoriju
app.post("/api/products/svi", (req, res) => {
  try {
    const noviProizvod = req.body;
    const data = readData();
    if (!data.svi) data.svi = [];
    data.svi.push(noviProizvod);
    writeData(data);
    res.status(201).json({ message: "Proizvod dodat u 'svi' kategoriju." });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju proizvoda." });
  }
});

// Dodaj proizvod u određenu kategoriju
app.post("/api/products/category", (req, res) => {
  try {
    const { proizvod, kategorija } = req.body;
    const data = readData();

    if (!data[kategorija]) {
      return res.status(400).json({ error: "Kategorija ne postoji." });
    }

    if (data[kategorija].some(p => p.naziv === proizvod.naziv)) {
      return res.status(400).json({ error: "Već postoji u toj kategoriji." });
    }

    data[kategorija].push(proizvod);
    writeData(data);
    res.status(201).json({ message: `Proizvod dodat u '${kategorija}'.` });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju proizvoda." });
  }
});

// Ostale rute
app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju podataka." });
  }
});

app.post('/api/artikal', (req, res) => {
  try {
    const novi = req.body;
    const data = readData();
    if (!data.svi) data.svi = [];
    data.svi.push(novi);
    writeData(data);
    res.json({ message: 'Artikal dodan' });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju artikla." });
  }
});

app.put('/api/dodaj/:kategorija', (req, res) => {
  try {
    const { kategorija } = req.params;
    const artikal = req.body;
    const data = readData();

    if (!data[kategorija]) return res.status(400).json({ error: 'Nepostojeća kategorija.' });

    if (data[kategorija].length >= 4) {
      return res.status(400).json({ error: 'Maksimalno 4 artikla u kategoriji.' });
    }

    if (!data[kategorija].some(a => a.naziv === artikal.naziv)) {
      data[kategorija].push(artikal);
      writeData(data);
    }

    res.json({ message: `Dodano u ${kategorija}` });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju artikla." });
  }
});

app.delete('/api/obrisi/:kategorija/:naziv', (req, res) => {
  try {
    const { kategorija, naziv } = req.params;
    const data = readData();

    if (!data[kategorija]) return res.status(400).json({ error: 'Nepostojeća kategorija.' });

    data[kategorija] = data[kategorija].filter(a => a.naziv !== naziv);
    writeData(data);

    res.json({ message: `Obrisano iz ${kategorija}` });
  } catch {
    res.status(500).json({ error: "Greška pri brisanju artikla." });
  }
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));
