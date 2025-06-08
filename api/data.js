const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Schema
const sensorSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  jumlah: Number,
  berat: Number,
  layanan: String,
  tanggal: String
}, { timestamps: true });

const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);

// Fungsi handler API
module.exports = async (req, res) => {
  await dbConnect();

  if (req.method === 'GET') {
    const data = await Sensor.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;
    if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const newData = await Sensor.create({ nama, harga, jumlah, berat, layanan, tanggal });
    return res.status(201).json({ message: 'Berhasil disimpan', data: newData });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const deleted = await Sensor.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });

    return res.status(200).json({ message: 'Data berhasil dihapus' });
  }

  res.status(405).json({ message: 'Method tidak didukung' });
};
