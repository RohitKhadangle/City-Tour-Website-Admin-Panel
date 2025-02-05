const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  register: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) return callback(err);
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [userData.name, userData.email, hash], callback);
    });
  },

  login: (email, password, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) return callback(err);
        if (!match) return callback(null, null);
        callback(null, results[0]);
      });
    });
  },
};

module.exports = User;
