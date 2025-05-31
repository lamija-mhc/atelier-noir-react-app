const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const kafe = []; // Ovo zamijeni bazom u pravom projektu
let preporuke = [];
let best = [];

// Multer setup za slike
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Kreiraj folder "uploads" ako ne postoji
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// GET /dohvatiKafu
router.get("/dohvatiKafu", (req, res) => {
  res.json({
    svi: kafe,
    preporuke,
    best,
  });
});

// POST /upisi
router.post("/upisi", upload.single("slika"), (req, res) => {
  const { naziv, opis, gramaza, cijena } = req.body;
  if (!naziv || !opis || !gramaza || !cijena || !req.file) {
    return res.json({ success: false, message: "Sva polja su obavezna." });
  }

  const novaKafa = {
    naziv,
    opis,
    gramaza,
    cijena,
    slika: req.file.filename,
  };

  kafe.push(novaKafa);
  res.json({ success: true });
});

// POST /dodajUKategoriju
router.post("/dodajUKategoriju", (req, res) => {
  const { kategorija, naziv } = req.body;
  const kafa = kafe.find((k) => k.naziv === naziv);
  if (!kafa) return res.json({ success: false, message: "Kafa ne postoji." });

  if (kategorija === "preporuke" && preporuke.length < 4) {
    preporuke.push(kafa);
    return res.json({ success: true, message: "Dodano u preporuke." });
  } else if (kategorija === "best" && best.length < 4) {
    best.push(kafa);
    return res.json({ success: true, message: "Dodano u best." });
  } else {
    return res.json({ success: false, message: "Limit za kategoriju je 4." });
  }
});

// POST /ukloniIzKategorije
router.post("/ukloniIzKategorije", (req, res) => {
  const { kategorija, naziv } = req.body;

  if (kategorija === "preporuke") {
    preporuke = preporuke.filter((k) => k.naziv !== naziv);
    return res.json({ success: true, message: "Uklonjeno iz preporuka." });
  } else if (kategorija === "best") {
    best = best.filter((k) => k.naziv !== naziv);
    return res.json({ success: true, message: "Uklonjeno iz best." });
  } else {
    return res.json({ success: false, message: "Nepoznata kategorija." });
  }
});

module.exports = router;
