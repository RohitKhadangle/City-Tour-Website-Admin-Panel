const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');

// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Connected to the database!');
    }
});

// Route for Home page
router.get('/', (req, res) => {
    res.render('index');  // Render the home page
});

// Route for Registration page
router.get('/register', (req, res) => {
    res.render('register');  // Render the registration form
});

// Route to handle registration form submission
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.log('Error checking email:', err);
            return res.status(500).send('Error checking email');
        }

        if (result.length > 0) {
            return res.status(400).send('Email is already registered');
        }

        // Encrypt password using bcrypt
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error encrypting password');
            }

            // Insert user into the database
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.log('Error inserting into database:', err);
                    return res.status(500).send('Error registering user');
                }

                // After successful registration, redirect to login page
                res.redirect('/login');
            });
        });
    });
});

// Route for Login page
router.get('/login', (req, res) => {
    res.render('login');  // Render the login form
});

// Route to handle login form submission
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            console.log('Error fetching user:', err);
            return res.status(500).send('Error logging in');
        }

        if (result.length === 0) {
            return res.status(400).send('User not found');
        }

        // Compare entered password with stored password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords');
            }

            if (isMatch) {
                // Successful login, set session and redirect to dashboard
                req.session.loggedIn = true;
                req.session.userId = result[0].id;
                req.session.username = result[0].username;

                // Redirect to the dashboard after successful login
                res.redirect('/dashboard');
            } else {
                res.status(400).send('Invalid credentials');
            }
        });
    });
});

// Route for Dashboard page (only accessible if logged in)
router.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', { username: req.session.username });
    } else {
        res.redirect('/login');  // Redirect to login if not logged in
    }
});

// Route for Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }

        res.redirect('/');  // Redirect to home page after logout
    });
});

module.exports = router;
