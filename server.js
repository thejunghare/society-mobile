const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asdf123', 
  database: 'society'
});

  // Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Connect to MySQL
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
