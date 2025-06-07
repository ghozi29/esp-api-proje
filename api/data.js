const express = require('express');
const cors = require('cors');
const app = express();

// Middleware for CORS
app.use(cors({
  origin: '*'
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data (gunakan "tanggal", bukan "Tanggal")
let sensorData = [
  { id: 1, nama: "juan", harga: 20000, jumlah: 4, berat: 10, layanan: "cepat", tanggal: "2025-06-07" },
  { id: 2, nama: "ana", harga: 25000, jumlah: 3, berat: 5, layanan: "biasa", tanggal: "2025-06-07" }
];

let currentId = 3;

// GET: Retrieve all data
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);
});

// POST: Add new data
app.post('/api/data', (req, res) => {
  const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;

  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newData = {
    id: currentId++,
    nama,
    harga,
    jumlah,
    berat,
    layanan,
    tanggal  // gunakan "tanggal" lowercase
  };

  sensorData.push(newData);
  res.status(201).json({ message: 'Data saved successfully!', data: newData });
});

// DELETE: Delete data by ID
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const index = sensorData.findIndex(item => item.id == id);

  if (index !== -1) {
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Export the app for Vercel
module.exports = app;
