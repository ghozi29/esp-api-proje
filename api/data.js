let sensorData = [
  { id: 1, nama: "juan", harga: 20000, jumlah: 4, berat: 10, layanan: "cepat", tanggal: "2025-06-07" },
  { id: 2, nama: "ana", harga: 25000, jumlah: 3, berat: 5, layanan: "biasa", tanggal: "2025-06-07" }
];

let currentId = 3;

module.exports = (req, res) => {
  const { method, url } = req;

  // Extract ID from URL like /api/data/2
  const match = url.match(/\/api\/data\/(\d+)/);
  const id = match ? parseInt(match[1]) : null;

  if (method === 'GET') {
    res.status(200).json(sensorData);
  }

  else if (method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const { nama, harga, jumlah, berat, layanan, tanggal } = JSON.parse(body);
      if (!nama || !harga || !jumlah || !berat || !layanan || !tanggal) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newData = { id: currentId++, nama, harga, jumlah, berat, layanan, tanggal };
      sensorData.push(newData);
      res.status(201).json({ message: 'Data saved', data: newData });
    });
  }

  else if (method === 'DELETE' && id) {
    const index = sensorData.findIndex(item => item.id === id);
    if (index !== -1) {
      sensorData.splice(index, 1);
      res.status(200).json({ message: 'Data deleted' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  }

  else if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
