let sensorData = {
  nama: null,
  harga: null,
  jumlah: null,
  berat: null,
  layanan: null
};

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Mengirimkan data terbaru saat ada permintaan GET
    res.status(200).json(sensorData);
  } else if (req.method === 'POST') {
    // Menyimpan data dari ESP yang dikirim via POST
    const { nama, harga, jumlah, berat, layanan } = req.body;
    sensorData = { nama, harga, jumlah, berat, layanan };
    res.status(200).json({ message: 'Data saved successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

/*const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();
const ref = db.ref("sensorData");

app.post('/api/data', (req, res) => {
  const data = req.body;
  
  // Menambahkan data baru ke database dengan timestamp
  const newData = ref.push(); // Menggunakan push() untuk menambah data baru
  newData.set({
    suhu: data.suhu,
    kelembapan: data.kelembapan,
    tinggi: data.tinggi,
    timestamp: Date.now()
  })
  .then(() => {
    res.status(200).send('Data saved successfully!');
  })
  .catch((error) => {
    res.status(500).send('Error saving data: ' + error.message);
  });
});*/

