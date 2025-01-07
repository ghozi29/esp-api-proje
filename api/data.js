let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20.000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  }
];

let currentId = 2;  // ID berikutnya yang akan digunakan

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Mengirimkan data dalam format array saat ada permintaan GET
    res.status(200).json(sensorData);
  } else if (req.method === 'POST') {
    // Menyimpan data baru dengan ID yang baru
    const { nama, harga, jumlah, berat, layanan } = req.body;

    // Membuat objek data baru dengan ID yang baru
    const newData = {
      id: currentId,
      nama,
      harga,
      jumlah,
      berat,
      layanan
    };

    // Menambahkan data baru ke dalam array
    sensorData.push(newData);

    // Menambahkan ID untuk entri berikutnya
    currentId++;

    res.status(200).json({ message: 'Data saved successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
