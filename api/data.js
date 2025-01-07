const express = require('express');
const app = express();

let sensorData = [
  {
    "id": 1,
    "nama": "juan",
    "harga": 20000,
    "jumlah": 4,
    "berat": 10,
    "layanan": "cepat"
  },
  // other items
];

// Middleware to handle JSON requests
app.use(express.json());

// GET: Fetch all data
app.get('/api/data', (req, res) => {
    res.status(200).json(sensorData);
});

// DELETE: Delete specific data by ID
app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const index = sensorData.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        // Remove the item from the array
        sensorData.splice(index, 1);
        res.status(200).json({ message: 'Data deleted successfully' });
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
