const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB URI dari Environment Variable VERCEL
const MONGO_URI = process.env.MONGO_URI;

// Connect MongoDB (harus cek koneksi sekali saja)
let conn = null;
async function connectToDatabase() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  return conn;
}

// Schema dan model
const sensorSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  jumlah: Number,
  berat: Number,
  layanan: String,
  tanggal: String
}, { timestamps: true });

const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);

// Router
app.get('/api/data', async (req, res) => {
  await connectToDatabase();
  const data = await Sensor.find().sort({ createdAt: -1 });
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  await connectToDatabase();
  const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;
  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }
  const newData = new Sensor({ nama, harga, jumlah, berat, layanan, tanggal });
  await newData.save();
  res.status(201).json({ message: 'Data berhasil disimpan!', data: newData });
});

app.delete('/api/data/:id', async (req, res) => {
  await connectToDatabase();
  const { id } = req.params;
  const deleted = await Sensor.findByIdAndDelete(id);
  if (deleted) {
    res.json({ message: 'Data berhasil dihapus!' });
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
});

// Export sebagai handler Vercel
module.exports = app;
