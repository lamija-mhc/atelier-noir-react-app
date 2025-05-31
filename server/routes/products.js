// routes/products.js

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Učitavanje podataka iz data.json fajla
const dataPath = path.join(__dirname, '..', 'data.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Greška prilikom učitavanja podataka" });
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

module.exports = router;
