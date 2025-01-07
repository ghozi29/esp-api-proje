const cors = require('cors');
const express = require('express');
const app = express();

// Menambahkan middleware CORS
app.use(cors({
  origin: '*', // Anda dapat mengganti '*' dengan domain spesifik jika ingin membatasi akses
}));

let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  },
  // Data lainnya
];

let currentId = 2;

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(sensorData);  // Mengirimkan data dalam format JSON
  } else if (req.method === 'POST') {
    // Menyimpan data baru jika ada request POST
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
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
