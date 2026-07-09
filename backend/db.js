// Import path module
const path = require("path")

// Load .env file from backend folder
require("dotenv").config({
  path: path.join(__dirname, ".env")
})

// Import mysql2
const mysql = require("mysql2")

// Check if environment variables are loading
console.log("DB CHECK:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT
})

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("MySQL connection failed:", err.message)
  } else {
    console.log("MySQL connected successfully")
    connection.release()
  }
})

// Export database
module.exports = db