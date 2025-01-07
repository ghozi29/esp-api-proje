const express = require('express');
const cors = require('cors');
const app = express();

// Middleware for CORS
app.use(cors({
  origin: '*'  // Allow all origins (you can restrict this to a specific domain)
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data
let sensorData = [
  { "id": 1, "nama": "juan", "harga": 20000, "jumlah": 4, "berat": 10, "layanan": "cepat" },
  { "id": 2, "nama": "ana", "harga": 25000, "jumlah": 3, "berat": 5, "layanan": "biasa" }
];

let currentId = 3;

// GET: Retrieve all data
app.get('/api/data', (req, res) => {
  res.status(200).json(sensorData);
});

// POST: Add new data
app.post('/api/data', (req, res) => {
  const { nama, harga, jumlah, berat, layanan } = req.body;
  if (!nama || !harga || !jumlah || !berat || !layanan) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newData = {
    id: currentId++,  // Use the current ID and increment it
    nama,
    harga,
    jumlah,
    berat,
    layanan
  };

  sensorData.push(newData);
  res.status(201).json({ message: 'Data saved successfully!' });
});

// DELETE: Delete data by ID
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params; // Extract the ID from URL
  const index = sensorData.findIndex(item => item.id == id);  // Find the index of the data

  if (index !== -1) {
    // If data exists, remove it from the array
    sensorData.splice(index, 1);
    res.status(200).json({ message: 'Data deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Data not found' });  // If data not found
  }
});

// Export the app for Vercel
module.exports = app;
