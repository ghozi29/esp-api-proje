const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definisi schema & model langsung di sini supaya simpel
const sensorSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  jumlah: Number,
  berat: Number,
  layanan: String,
  tanggal: String
}, { timestamps: true });

const Sensor = mongoose.model('Sensor', sensorSchema);

// GET semua data
router.get('/', async (req, res) => {
  try {
    const data = await Sensor.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error mengambil data' });
  }
});

// POST data baru
router.post('/', async (req, res) => {
  const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;
  if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const newData = new Sensor({ nama, harga, jumlah, berat, layanan, tanggal });
    await newData.save();
    res.status(201).json({ message: 'Data berhasil disimpan!', data: newData });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan data' });
  }
});

// DELETE data berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Sensor.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ message: 'Data berhasil dihapus!' });
    } else {
      res.status(404).json({ message: 'Data tidak ditemukan' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error menghapus data' });
  }
});

module.exports = router;
