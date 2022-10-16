const express = require('express');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

const dbConnection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

app.get('/reviews', (req, res) => {
  dbConnection.query('SELECT * FROM books', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/reviews', (req, res) => {
  const insertQuery = 'INSERT INTO books SET ?';
  dbConnection.query(insertQuery, req.body, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Review added to Database");
    }
  })
});

app.put('/reviews', (req, res) => {
  const updateQuery = 'UPDATE books SET book_review = ?, book_rating = ? WHERE id = ?';
  dbConnection.query(updateQuery, [req.body.book_review, req.body.book_rating, req.body.id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.delete('/reviews/:id', (req, res) => {
  dbConnection.query('DELETE FROM books WHERE id = ?', req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})