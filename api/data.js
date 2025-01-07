let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,  // Menggunakan angka, bukan format dengan titik
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

    // Pastikan input berupa angka yang valid
    const parsedHarga = parseFloat(harga);
    const parsedJumlah = parseInt(jumlah);
    const parsedBerat = parseFloat(berat);

    // Validasi input
    if (isNaN(parsedHarga) || isNaN(parsedJumlah) || isNaN(parsedBerat)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Membuat objek data baru dengan ID yang baru
    const newData = {
      id: currentId,
      nama,
      harga: parsedHarga,
      jumlah: parsedJumlah,
      berat: parsedBerat,
      layanan
    };

    // Menambahkan data baru ke dalam array
    sensorData.push(newData);

    // Menambahkan ID untuk entri berikutnya
    currentId++;

    // Mengirimkan status sukses dengan status code 201
    res.status(201).json({ message: 'Data saved successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
