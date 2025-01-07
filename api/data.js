// Mengimpor dependensi
const cors = require('cors');

// Menggunakan express untuk menangani request HTTP
const express = require('express');
const app = express();

// Middleware untuk memungkinkan CORS
app.use(cors({
  origin: '*', // Mengizinkan akses dari semua origin, atau ganti dengan origin spesifik jika dibutuhkan
}));

// Menangani request JSON
app.use(express.json());

let sensorData = [
  { "id": 1, "nama": "juan", "harga": 20000, "jumlah": 4, "berat": 10, "layanan": "cepat" },
  { "id": 2, "nama": "ana", "harga": 25000, "jumlah": 3, "berat": 5, "layanan": "biasa" }
  // Data lainnya
];

let currentId = 3;

// Endpoint untuk mendapatkan semua data (GET)
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);
});

// Endpoint untuk menghapus data berdasarkan ID (DELETE)
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  // Mencari data dengan ID yang sesuai
  const index = sensorData.findIndex(item => item.id == id);
  if (index !== -1) {
    // Menghapus data
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Menangani POST untuk menyimpan data baru
app.post('/api/data', (req, res) => {
  const { nama, harga, jumlah, berat, layanan } = req.body;
  const newData = {
    id: currentId++,
    nama,
    harga,
    jumlah,
    berat,
    layanan
  };
  sensorData.push(newData);
  res.status(201).json({ message: 'Data saved successfully!' });
});

// Ekspor sebagai handler untuk fungsi serverless di Vercel
module.exports = app;
