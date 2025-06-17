const express = require('express');
const router = express.Router();

// Route definitions here
router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login Panel',
        layout: 'auth/layout',
        user: req.user || null,
    });
});
module.exports = router;
