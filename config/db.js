const mysql = require('mysql2');  // Use mysql2 instead of mysql
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',  // Ensure this is correct
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'your_database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
    } else {
        console.log('Connected to the database!');
    }
});

module.exports = connection;