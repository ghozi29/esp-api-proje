const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Menggunakan CORS untuk mengizinkan akses dari domain lain
app.use(cors({
  origin: '*' // Anda dapat mengganti '*' dengan domain spesifik jika diperlukan
}));

// Middleware untuk parsing request body (biasanya menggunakan JSON)
app.use(bodyParser.json());

// Menyiapkan route API untuk data
let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  }
];

let currentId = 2;

// Route untuk menangani request GET dan POST
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);  // Mengirimkan data dalam format JSON
});

app.post('/api/data', (req, res) => {
  const { nama, harga, jumlah, berat, layanan } = req.body;
  const newData = {
    id: currentId,
    nama,
    harga,
    jumlah,
    berat,
    layanan
  };
  sensorData.push(newData);
  currentId++;
  res.status(201).json({ message: 'Data saved successfully!' });
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
