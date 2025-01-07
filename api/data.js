const express = require('express');
const cors = require('cors');
const app = express();

// Middleware untuk CORS, mengizinkan semua origin
app.use(cors({
  origin: '*', // Anda bisa ganti dengan domain spesifik jika ingin membatasi akses
}));

// Middleware untuk body-parser (membaca request body dalam format JSON)
app.use(express.json());

// Dummy data yang akan diakses melalui API
let sensorData = [
  { "id": 1, "nama": "juan", "harga": 20000, "jumlah": 4, "berat": 10, "layanan": "cepat" },
  { "id": 2, "nama": "ana", "harga": 25000, "jumlah": 3, "berat": 5, "layanan": "biasa" }
  // Anda bisa menambahkan data lain di sini
];

let currentId = 3; // ID untuk data yang baru

// Endpoint untuk mengambil data (GET)
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);
});

// Endpoint untuk menambahkan data baru (POST)
app.post('/api/data', (req, res) => {
  const { nama, harga, jumlah, berat, layanan } = req.body;

  // Pastikan semua data yang diperlukan ada dan valid
  if (!nama || !harga || !jumlah || !berat || !layanan) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newData = {
    id: currentId++, // Menggunakan ID yang baru
    nama,
    harga,
    jumlah,
    berat,
    layanan
  };

  // Menambahkan data baru ke dalam array
  sensorData.push(newData);

  // Mengirim response sukses
  res.status(201).json({ message: 'Data saved successfully!' });
});

// Endpoint untuk menghapus data berdasarkan ID (DELETE)
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params; // ID yang akan dihapus

  // Mencari index data berdasarkan ID
  const index = sensorData.findIndex(item => item.id == id);
  if (index !== -1) {
    // Menghapus data dari array
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Export app untuk digunakan oleh Vercel sebagai fungsi serverless
module.exports = app;
