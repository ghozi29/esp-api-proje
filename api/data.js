const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json());

let sensorData = [
  { id: 1, nama: "juan", harga: 10000, jumlah: 4, berat: 0.93, layanan: "cepat", tanggal: "2025-06-07", tanggalPengambilan: "2025-06-08", code: "231242" },
  { id: 2, nama: "jovan", harga: 10000, jumlah: 3, berat: 0.86, layanan: "biasa", tanggal: "2025-06-07", tanggalPengambilan: "2025-06-12", code: "167812" }
];
let currentId = 3;

// GET all
router.get('/', (req, res) => {
  res.json(sensorData);
});

// POST new
router.post('/', (req, res) => {
  const { nama, harga, jumlah, berat, layanan, tanggal, tanggalPengambilan, code } = req.body;

  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal || !tanggalPengambilan || !code) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newData = {
    id: currentId++,
    nama,
    harga,
    jumlah,
    berat,
    layanan,
    tanggal,
    tanggalPengambilan,
    code
  };

  sensorData.push(newData);
  res.status(201).json({ message: 'Data saved successfully!', data: newData });
});


// DELETE by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = sensorData.findIndex(item => item.id == id);

  if (index !== -1) {
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Attach router
app.use('/api/data', router);

module.exports = app;
