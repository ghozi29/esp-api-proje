let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  },
  // Anda dapat menambahkan lebih banyak data di sini jika diperlukan
];

let currentId = 2;  // ID berikutnya yang akan digunakan

// Menangani permintaan GET dan POST
module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Mengirimkan data dalam format JSON saat permintaan GET
    res.status(200).json(sensorData);
  } else if (req.method === 'POST') {
    // Menyimpan data baru yang dikirimkan melalui POST request
    const { nama, harga, jumlah, berat, layanan } = req.body;

    // Membuat objek data baru dengan ID baru
    const newData = {
      id: currentId,
      nama,
      harga,
      jumlah,
      berat,
      layanan
    };

    // Menambahkan data baru ke dalam array sensorData
    sensorData.push(newData);
    currentId++;  // Menambahkan ID untuk data berikutnya

    // Mengirimkan respons status 201 (Created)
    res.status(201).json({ message: 'Data saved successfully!' });
  } else {
    // Mengirimkan status 405 jika metode selain GET atau POST digunakan
    res.status(405).json({ message: 'Method not allowed' });
  }
};
