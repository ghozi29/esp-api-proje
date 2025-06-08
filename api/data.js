const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error('MONGO_URI not set in environment');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false
    }).then(m => {
      console.log('✅ MongoDB connected');
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Define Schema
const SensorSchema = new mongoose.Schema({
  nama: String,
  harga: Number,
  jumlah: Number,
  berat: Number,
  layanan: String,
  tanggal: String
}, { timestamps: true });

const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', SensorSchema);

// API Handler
module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    const data = await Sensor.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { nama, harga, jumlah, berat, layanan, tanggal } = req.body;
    if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    const created = await Sensor.create({ nama, harga, jumlah, berat, layanan, tanggal });
    return res.status(201).json(created);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const deleted = await Sensor.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Data tidak ditemukan' });
    return res.status(200).json({ message: 'Berhasil dihapus' });
  }

  return res.status(405).json({ message: 'Method tidak didukung' });
};
