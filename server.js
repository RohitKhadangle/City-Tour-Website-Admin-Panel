const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public"));  // This serves static files like CSS, JS, etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Import routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Use routes
app.use("/", userRoutes);       // For user pages like home and login
app.use("/admin", adminRoutes); // For admin pages like dashboard

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
