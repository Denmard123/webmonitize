const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
let { mattresses, testimonials } = require('./data'); // Impor data dari data.js

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Route untuk menampilkan admin.html ketika mengakses root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// CRUD Endpoints untuk kasur
app.get('/api/mattresses', (req, res) => {
  res.json(mattresses);
});

app.post('/api/mattresses', (req, res) => {
  const newMattress = { id: mattresses.length + 1, ...req.body };
  mattresses.push(newMattress);
  res.status(201).json(newMattress);
});

app.put('/api/mattresses/:id', (req, res) => {
  const { id } = req.params;
  const index = mattresses.findIndex(m => m.id == id);
  if (index !== -1) {
    mattresses[index] = { id: +id, ...req.body };
    res.json(mattresses[index]);
  } else {
    res.status(404).send('Mattress not found');
  }
});

app.delete('/api/mattresses/:id', (req, res) => {
  const { id } = req.params;
  mattresses = mattresses.filter(m => m.id != id); // Memperbarui array mattresses
  res.status(204).send();
});

// CRUD Endpoints untuk testimonial
app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});

app.post('/api/testimonials', (req, res) => {
  const newTestimonial = { id: testimonials.length + 1, ...req.body };
  testimonials.push(newTestimonial);
  res.status(201).json(newTestimonial);
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
