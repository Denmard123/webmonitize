const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Persij@1',
  database: 'admin_cms',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Menyimpan file di folder 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file akan menjadi timestamp saat diupload
  },
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// Endpoint untuk menambahkan data baru ke dalam tabel sales_data
app.post('/sales', async (req, res) => {
  const { Years_of_experience, penjualan } = req.body; // Memastikan nama field sesuai dengan yang diharapkan
  try {
    // Lakukan penambahan data ke database menggunakan query INSERT
    await db.promise().query('INSERT INTO sales_data (penjualan, Years_of_experience) VALUES (?, ?)', [Years_of_experience, penjualan]);
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Failed to add data' });
  }
});


// Endpoint untuk mendapatkan data dari tabel sales_data
app.get('/sales', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM sales_data');
    res.status(200).json(rows); // Mengembalikan data ke frontend
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Failed to fetch sales data' });
  }
});

// Endpoint untuk mengupdate data di dalam tabel sales_data berdasarkan ID
app.put('/sales/:id', async (req, res) => {
  const productId = req.params.id;
  const { productName, price } = req.body;
  try {
    // Lakukan operasi UPDATE di database berdasarkan ID
    const result = await db.promise().query('UPDATE sales_data SET penjualan = ?, Years_of_experience = ? WHERE id = ?', [price, productName, productId]);
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      throw new Error('Failed to update data');
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Failed to update data' });
  }
});

// Endpoint untuk menghapus data dari tabel sales_data berdasarkan ID
app.delete('/sales/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    // Lakukan operasi DELETE di database berdasarkan ID
    const result = await db.promise().query('DELETE FROM sales_data WHERE id = ?', [productId]);
    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      throw new Error('Failed to delete data');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Failed to delete data' });
  }
});



// Endpoint untuk mendapatkan data testimonial
app.get('/testimonials', async (req, res) => {
  try {
    const [testimonials] = await db.promise().query('SELECT * FROM testimonials');
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ message: 'Failed to fetch testimonials' });
  }
});

// Endpoint untuk menambah testimoni baru dengan gambar
app.post('/testimonials', upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const imagePath = req.file.filename; // Nama file yang disimpan di server

  try {
    // Simpan data testimoni dan imagePath ke database
    await db.promise().query('INSERT INTO testimonials (text, image_path) VALUES (?, ?)', [text, imagePath]);
    res.status(201).json({ message: 'Testimonial added successfully' });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ message: 'Failed to add testimonial' });
  }
});

// Endpoint untuk menghapus testimoni berdasarkan ID
app.delete('/testimonials/:id', async (req, res) => {
  const testimonialId = req.params.id;
  try {
    const [existingTestimonial] = await db.promise().query('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);

    if (!existingTestimonial.length) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await db.promise().query('DELETE FROM testimonials WHERE id = ?', [testimonialId]);
    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ message: 'Failed to delete testimonial' });
  }
});

// Endpoint untuk mendapatkan data galeri
app.get('/gallery', async (req, res) => {
  try {
    const [galleryData] = await db.promise().query('SELECT * FROM gallery_data');
    res.status(200).json({ galleryData });
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    res.status(500).json({ message: 'Failed to fetch gallery data' });
  }
});

app.post('/gallery', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Simpan informasi gambar ke database
    const imagePath = req.file.filename;
    await db.promise().query('INSERT INTO gallery_data (image_path) VALUES (?)', [imagePath]);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Failed to upload file');
  }
});

app.delete('/delete_gallery_image/:id', async (req, res) => {
  const imageId = req.params.id;
  try {
    const [existingImage] = await db.promise().query('SELECT * FROM gallery_data WHERE id = ?', [imageId]);

    if (!existingImage.length) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await db.promise().query('DELETE FROM gallery_data WHERE id = ?', [imageId]);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
