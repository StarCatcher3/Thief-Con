// Import the mysql2 module
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const password = process.env.AIVEN_PASSWORD

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'thief-con-sql-thief-con.a.aivencloud.com',     // Replace with your host
  port: 24662,
  user: 'avnadmin',          // Replace with your username
  password: password,          // Replace with your password
  database: 'defaultdb'       // Replace with your database name
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');
});

// Run a database query
export const runQuery = async () => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  });
}

export const addUser = async (username, password) => {
  connection.query('INSERT INTO users (username, password, step) VALUES (?, ?, ?)', [username, password, 0], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  });
}


// Close the connection
//connection.end();