const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

let conn = null;
async function connectToDatabase() {
  if (conn) return conn;
  conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return conn;
}

const sensorSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  jumlah: Number,
  berat: Number,
  layanan: String,
  tanggal: String,
}, { timestamps: true });

const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);

// NOTE: Vercel API routes prefix with /api/data so in Express use '/'

app.get('/', async (req, res) => {
  await connectToDatabase();
  const data = await Sensor.find().sort({ createdAt: -1 });
  // Kirimkan id dari _id supaya frontend bisa akses
  const dataWithId = data.map(item => ({
    id: item._id.toString(),
    tanggal: item.tanggal,
    nama: item.nama,
    harga: item.harga,
    jumlah: item.jumlah,
    berat: item.berat,
    layanan: item.layanan,
  }));
  res.json(dataWithId);
});

app.post('/', async (req, res) => {
  await connectToDatabase();
  const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;
  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }
  const newData = new Sensor({ nama, harga, jumlah, berat, layanan, tanggal });
  await newData.save();
  res.status(201).json({ message: 'Data berhasil disimpan!', data: {
    id: newData._id.toString(),
    nama, harga, jumlah, berat, layanan, tanggal
  }});
});

app.delete('/:id', async (req, res) => {
  await connectToDatabase();
  const { id } = req.params;
  const deleted = await Sensor.findByIdAndDelete(id);
  if (deleted) {
    res.json({ message: 'Data berhasil dihapus!' });
  } else {
    res.status(404).json({ message: 'Data tidak ditemukan' });
  }
});

module.exports.handler = serverless(app);
