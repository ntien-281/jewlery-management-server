const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require("dotenv").config();
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.static("public"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// Main
app.get("/", (req, res) => {
  res.render("/public/index", { });
})

app.get("/products", (req, res) => {
  db.query("SELECT * FROM sanpham", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});