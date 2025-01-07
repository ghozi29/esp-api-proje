const express = require('express');
const app = express();

app.use(express.json());  // Untuk parsing JSON

// Data contoh yang akan dioperasikan
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

// Endpoint untuk mendapatkan semua data
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);
});

// Endpoint untuk menghapus data berdasarkan ID
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  // Cari data dengan ID yang cocok
  const index = sensorData.findIndex(item => item.id == id);
  if (index !== -1) {
    // Hapus data dari array
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
