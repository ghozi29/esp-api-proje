const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dataRouter = require('./api/data');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Ganti dengan URI MongoDB kamu
const MONGO_URI = 'mongodb+srv://ghoziskripsi:<db_password>@cluster0.hv9fcj0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Koneksi MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Terhubung ke MongoDB'))
  .catch(err => console.error('❌ Gagal koneksi MongoDB:', err));

// Pakai router
app.use('/api/data', dataRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});

