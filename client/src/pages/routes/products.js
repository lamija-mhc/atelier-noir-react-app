const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFilePath = path.join(__dirname, '../data/data.json'); // putanja do data.json

router.post('/category', (req, res) => {
  const { proizvod, kategorija } = req.body;

  if (!proizvod || !kategorija) {
    return res.status(400).json({ error: "Proizvod i kategorija su obavezni." });
  }

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Greška pri čitanju podataka." });

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).json({ error: "Neispravan JSON format." });
    }

    if (!jsonData[kategorija]) {
      return res.status(400).json({ error: "Nepoznata kategorija." });
    }

    jsonData[kategorija].push(proizvod);

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), err => {
      if (err) return res.status(500).json({ error: "Greška pri snimanju podataka." });

      res.json({ message: `Proizvod uspješno dodat u kategoriju ${kategorija}.` });
    });
  });
});

module.exports = router;
