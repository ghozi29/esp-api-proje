// data.js (Backend API handler for GET, PUT, DELETE)
const express = require('express');
const app = express();

// Sample data (usually this data would be in a database)
let sensorData = [
    {
        "id": 1,
        "nama": "juan",
        "harga": 20000,
        "jumlah": 4,
        "berat": 10,
        "layanan": "cepat"
    },
    {
        "id": 2,
        "nama": "Anna",
        "harga": 30000,
        "jumlah": 5,
        "berat": 15,
        "layanan": "standar"
    }
];

let currentId = 3;

// Middleware to handle JSON requests
app.use(express.json());  // Parse JSON request body

// Route to GET all data
app.get('/api/data', (req, res) => {
    res.status(200).json(sensorData);  // Return all sensorData
});

// Route to GET specific data by ID
app.get('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const item = sensorData.find(data => data.id === parseInt(id));
    
    if (item) {
        res.status(200).json(item);  // If found, return the data
    } else {
        res.status(404).json({ message: 'Data not found' });  // If not found
    }
});

// Route to PUT (update) existing data by ID
app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { nama, harga, jumlah, berat, layanan } = req.body;
    
    const index = sensorData.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        // Update the item
        sensorData[index] = {
            id: parseInt(id),
            nama,
            harga,
            jumlah,
            berat,
            layanan
        };

        res.status(200).json({ message: 'Data updated successfully' });
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// Route to DELETE data by ID
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

// Set the port (necessary for deployment on Vercel)
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

