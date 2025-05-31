const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'data.json');

function readData() {
  const jsonData = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(jsonData);
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
  try {
    const data = readData();
    res.json(data.svi);  // vraća proizvode iz kategorije 'svi'
  } catch (error) {
    res.status(500).json({ error: 'Greška pri čitanju proizvoda.' });
  }
};

exports.addToSvi = (req, res) => {
  try {
    const noviProizvod = req.body;
    const data = readData();
    data.svi.push(noviProizvod);
    writeData(data);
    res.status(201).json({ message: 'Proizvod dodat u kategoriju svi.' });
  } catch (error) {
    res.status(500).json({ error: 'Greška pri dodavanju proizvoda.' });
  }
};
