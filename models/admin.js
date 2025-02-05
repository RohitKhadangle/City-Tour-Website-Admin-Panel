const db = require("../config/db");

const Admin = {
  getUsers: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  deleteUser: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};

module.exports = Admin;
