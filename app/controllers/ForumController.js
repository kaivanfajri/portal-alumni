const db = require('../services/db');  // Pastikan koneksi database sudah benar

module.exports = {
    // Fungsi untuk menambah forum diskusi baru
    addForum: (req, res) => {
        const { judul, deskripsi } = req.body;  // Ambil data dari body request

        // Query untuk menambah forum ke database
        const query = 'INSERT INTO forum_diskusi (judul, isi) VALUES (?, ?)';
        db.query(query, [judul, deskripsi], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Terjadi kesalahan saat menambah forum' });
            }
            res.status(200).json({ message: 'Forum berhasil ditambahkan' });
        });
    },
};
