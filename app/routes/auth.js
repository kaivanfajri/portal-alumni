const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Login Alumni
router.get('/alumni/login', (req, res) => {
    res.render('auth/alumni/login', { error: null });
});

router.post('/alumni/login', AuthController.loginAlumni);

router.get('/alumni/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/alumni/login');
});

// Register Alumni
router.get('/register', (req, res) => {
    res.render('auth/register', { error: null });
});

module.exports = router;
