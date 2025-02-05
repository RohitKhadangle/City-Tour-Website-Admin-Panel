const express = require('express');
const router = express.Router();

// Admin dashboard route
router.get('/', (req, res) => {
    res.render('admin-dashboard');  // This will render 'views/admin-dashboard.ejs'
});

module.exports = router;
