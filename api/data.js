// api/data.js
const cors = require('cors');

// Gunakan cors agar bisa mengakses API dari domain lain
const corsHandler = cors({
  origin: '*', // Anda bisa mengganti '*' dengan domain yang lebih spesifik
  methods: ['GET', 'POST']
});

let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  },
  // Data lainnya...
];

let currentId = 2;

// Fungsi utama yang menangani request
module.exports = (req, res) => {
  // Menambahkan CORS middleware
  corsHandler(req, res, () => {
    if (req.method === 'GET') {
      res.status(200).json(sensorData); // Mengirimkan data
    } else if (req.method === 'POST') {
      // Menambahkan data baru
      const { nama, harga, jumlah, berat, layanan } = req.body;

      // Validasi data
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
  });
};
