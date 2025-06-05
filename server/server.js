const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Putanje
const DATA_PATH = path.join(__dirname, "..", "client", "src", "data", "data.json");
const USERS_PATH = path.join(__dirname, "users.json");

// Middleware
app.use(cors());
app.use(express.json());

// Helpers
const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// --- USERS ---
app.get("/api/users", (req, res) => {
  try {
    const users = readJSON(USERS_PATH);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Greška pri čitanju korisnika." });
  }
});

app.post("/api/users", (req, res) => {
  const noviKorisnik = req.body;
  try {
    const users = readJSON(USERS_PATH);
    if (users.find(u => u.email === noviKorisnik.email)) {
      return res.status(400).json({ error: "Korisnik već postoji." });
    }
    users.push(noviKorisnik);
    writeJSON(USERS_PATH, users);
    res.status(201).json({ message: "Korisnik uspješno dodan." });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dodavanju korisnika." });
  }
});

app.get("/api/user-type/:email", (req, res) => {
  try {
    const users = readJSON(USERS_PATH);
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ error: "Korisnik nije pronađen." });
    res.json({ type: user.role === "admin" ? "admin" : "guest" });
  } catch (err) {
    res.status(500).json({ error: "Greška pri dohvaćanju tipa korisnika." });
  }
});

// --- CART ---
// Dodaj proizvod u korpu korisnika (izmijenjeno da povećava količinu ako proizvod postoji)
app.post("/api/cart/:email", (req, res) => {
  const { email } = req.params;
  const noviProizvod = req.body; // očekujemo objekat sa npr. { id, naziv, cijena, kolicina }

  try {
    const users = readJSON(USERS_PATH);
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return res.status(404).json({ error: "Korisnik nije pronađen." });
    }

    if (!users[userIndex].korpa) {
      users[userIndex].korpa = [];
    }

    const korpa = users[userIndex].korpa;

    // Provjeri da li proizvod već postoji u korpi
    const postojiProizvod = korpa.find(p => p.id === noviProizvod.id);

    if (postojiProizvod) {
      // Povećaj količinu
      postojiProizvod.kolicina += noviProizvod.kolicina;
    } else {
      // Dodaj novi proizvod u korpu
      korpa.push(noviProizvod);
    }

    writeJSON(USERS_PATH, users);

    res.json({ message: "Artikal dodat u korpu." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri dodavanju u korpu." });
  }
});

app.delete("/api/cart/:email/:naziv", (req, res) => {
  const { email, naziv } = req.params;

  try {
    const users = readJSON(USERS_PATH);
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
      return res.status(404).json({ error: "Korisnik nije pronađen." });
    }

    const korpa = users[userIndex].korpa || [];

    console.log("Prije brisanja:", korpa.length);

    users[userIndex].korpa = korpa.filter(p => p.naziv !== naziv);

    console.log("Nakon brisanja:", users[userIndex].korpa.length);

    writeJSON(USERS_PATH, users);

    res.json({ message: "Proizvod uklonjen iz korpe." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greška pri brisanju proizvoda iz korpe." });
  }
});



// --- PRODUCTS ---
const readData = () => readJSON(DATA_PATH);
const writeData = (data) => writeJSON(DATA_PATH, data);

app.get("/api/products", (req, res) => {
  try {
    const data = readData();
    const sviProizvodi = Object.values(data).flat(); // spaja sve nizove
    res.json(sviProizvodi);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju proizvoda." });
  }
});

app.get("/api/products/:category", (req, res) => {
  try {
    const data = readData();
    const category = req.params.category;
    res.json(data[category] || []);
  } catch {
    res.status(500).json({ error: "Greška pri čitanju proizvoda iz kategorije." });
  }
});

app.post("/api/products/svi", (req, res) => {
  try {
    const data = readData();
    if (!data.svi) data.svi = [];
    data.svi.push(req.body);
    writeData(data);
    res.status(201).json({ message: "Proizvod dodat u 'svi' kategoriju." });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju proizvoda." });
  }
});

app.post("/api/products/category", (req, res) => {
  try {
    const { proizvod, kategorija } = req.body;
    const data = readData();

    if (!data[kategorija]) {
      return res.status(400).json({ error: "Kategorija ne postoji." });
    }

    if (data[kategorija].some(p => p.naziv === proizvod.naziv)) {
      return res.status(400).json({ error: "Proizvod već postoji u toj kategoriji." });
    }

    data[kategorija].push(proizvod);
    writeData(data);
    res.status(201).json({ message: `Proizvod dodat u '${kategorija}'.` });
  } catch {
    res.status(500).json({ error: "Greška pri dodavanju proizvoda." });
  }
});

// --- ADMIN RUTE ---
app.post('/api/artikal', (req, res) => {
  try {
    const data = readData();
    if (!data.svi) data.svi = [];
    data.svi.push(req.body);
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

    if (!data[kategorija]) {
      return res.status(400).json({ error: 'Nepostojeća kategorija.' });
    }

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

    if (!data[kategorija]) {
      return res.status(400).json({ error: 'Nepostojeća kategorija.' });
    }

    data[kategorija] = data[kategorija].filter(a => a.naziv !== naziv);
    writeData(data);

    res.json({ message: `Obrisano iz ${kategorija}` });
  } catch {
    res.status(500).json({ error: "Greška pri brisanju artikla." });
  }
});

// --- START SERVER ---
app.listen(PORT, () => console.log(`✅ Server radi na portu ${PORT}`));
