const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

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
    createTableIfNotExists();
  }
});

const createTableIfNotExists = () => {
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      resetToken VARCHAR(255),
      resetTokenExpiration BIGINT
    )
  `, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully');
    }
  });
};

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
    const existingUser = await db.promise().query(checkUsernameQuery, [username]);

    if (existingUser[0].length > 0) {
      return res.status(400).send('Username already exists');
    }

    const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await db.promise().query(insertUserQuery, [username, hashedPassword]);

    console.log('User registered successfully');
    res.status(200).end();
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
    } else if (result.length > 0) {
      const isPasswordValid = await bcrypt.compare(password, result[0].password);
      if (isPasswordValid) {
        console.log('Login successful');
        res.status(200).send('Login successful');
      } else {
        console.log('Invalid password');
        res.status(401).send('Invalid password');
      }
    } else {
      console.log('User not found');
      res.status(404).send('User not found');
    }
  });
});

app.get('/users/:username', (req, res) => {
  const { username } = req.params;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Error fetching user');
    } else if (result.length > 0) {
      const user = result[0];
      res.status(200).json(user);
    } else {
      console.log('User not found');
      res.status(404).send('User not found');
    }
  });
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token berlaku selama 1 jam

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    const transporter = nodemailer.createTransport({
      // Konfigurasi transporter email
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Reset Password Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="http://your-app.com/reset/${resetToken}">link</a> to set a new password.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Error sending password reset email' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Reset token is valid, update the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
