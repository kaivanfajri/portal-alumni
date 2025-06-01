const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware untuk parsing body form
app.use(express.urlencoded({ extended: true }));

// Middleware untuk file statis (CSS, gambar, dll.)
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk menampilkan halaman login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Route untuk proses login (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // TODO: Validasi login, saat ini hanya dummy response
    if (username === 'admin' && password === 'admin123') {
        res.send('Login berhasil!');
    } else {
        res.send('Username atau password salah.');
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
