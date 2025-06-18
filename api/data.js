const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

app.use(cors({ origin: '*' }));
app.use(express.json());

let sensorData = [
  { id: 1, nama: "juan", harga: 10000, jumlah: 4, berat: 0.93, layanan: "cepat", tanggal: "2025-06-07", tanggalPengambilan: "2025-06-08", code: "231242" },
  { id: 2, nama: "jovan", harga: 7000, jumlah: 3, berat: 0.86, layanan: "biasa", tanggal: "2025-06-07", tanggalPengambilan: "2025-06-12", code: "167812" },
  { id: 3, nama: "jordi", harga: 7000, jumlah: 2, berat: 0.56, layanan: "biasa", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-23", code: "123691" },
  { id: 4, nama: "harja", harga: 7000, jumlah: 6, berat: 0.98, layanan: "biasa", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-23", code: "523923" },
   { id: 5, nama: "robert", harga: 7000, jumlah: 2, berat: 0.56, layanan: "biasa", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-23", code: "763261" },
  { id: 6, nama: "hezekia", harga: 10000, jumlah: 6, berat: 0.98, layanan: "cepat", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-19", code: "752410" },
  { id: 7, nama: "rania", harga: 9900, jumlah: 8, berat: 1.10, layanan: "sedang", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-21", code: "286521" },
  { id: 8, nama: "burhan", harga: 10000, jumlah: 5, berat: 0.88, layanan: "cepat", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-19", code: "528901" },
   { id: 9, nama: "kaesang", harga: 14040, jumlah: 12, berat: 1.56, layanan: "sedang", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-21", code: "165290" },
  { id: 10, nama: "marlong", harga: 19800, jumlah: 17, berat: 2.20, layanan: "sedang", tanggal: "2025-06-18", tanggalPengambilan: "2025-06-21", code: "308615" },
];
let currentId = 3;

// GET all
router.get('/', (req, res) => {
  res.json(sensorData);
});

// POST new
router.post('/', (req, res) => {
  const { nama, harga, jumlah, berat, layanan, tanggal, tanggalPengambilan, code } = req.body;

  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal ) {
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
