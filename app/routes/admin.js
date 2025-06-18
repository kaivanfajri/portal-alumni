const express = require('express');
const router = express.Router();

// Middleware untuk memastikan hanya admin yang bisa akses
// (opsional - sesuaikan dengan sistem authentication Anda)
const requireAdmin = (req, res, next) => {
    // Contoh pengecekan admin - sesuaikan dengan sistem Anda
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.redirect('/login'); // atau halaman error 403
    }
};

// Terapkan middleware ke semua route admin
// router.use(requireAdmin); // Uncomment jika ingin mengaktifkan

// Route utama admin - menampilkan dashboard
router.get('/', (req, res) => {
    res.render('admin/dashboard', {
        title: 'Admin Dashboard',
        layout: 'admin/layout', // layout khusus admin jika ada
        user: req.user || null,
        // Data statistik atau info lain untuk dashboard
        stats: {
            totalUsers: 0,
            totalPosts: 0,
            totalForums: 0,
        },
    });
});

// Route untuk forum management
router.get('/kelola-forum', (req, res) => {
    res.render('admin/kelola-forum', {
        title: 'Kelola Forum - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        forums: [], // nanti bisa diisi dari database
    });
});

// Route untuk notifikasi
router.get('/kirim-notifikasi', (req, res) => {
    res.render('admin/kirim-notifikasi', {
        title: 'Kirim Notifikasi- Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        kirimNotifikasi: [], // nanti bisa diisi dari database
    });
});

// Route untuk verifikasi layanan
router.get('/verifikasi-layanan', (req, res) => {
    res.render('admin/verifikasi-layanan', {
        title: 'Verifikasi Layanan - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        layanan: [], // nanti bisa diisi dari database
    });
});

// Route untuk verifikasi layanan
router.get('/kelola-acara', (req, res) => {
    res.render('admin/kelola-acara', {
        title: 'Kelola Acara - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        kelolaacara: [], // nanti bisa diisi dari database
    });
});

// Route untuk ekspor tracer
router.get('/ekspor-tracer', (req, res) => {
    res.render('admin/ekspor-tracer', {
        title: 'Ekspor Tracer - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        eksportracer: [], // nanti bisa diisi dari database
    });
});

// Route untuk riwayat pengajuan
router.get('/riwayat-pengajuan', (req, res) => {
    res.render('admin/riwayat-pengajuan', {
        title: 'Riwayat Pengajuan - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        riwayatpengajuan: [], // nanti bisa diisi dari database
    });
});

// Route untuk moderasi job posting
router.get('/moderasi-job-posting', (req, res) => {
    res.render('admin/moderasi-job-posting', {
        title: 'Moderasi Job Posting - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        moderasijobposting: [], // nanti bisa diisi dari database
    });
});

// Route untuk kelola-data-alumni
router.get('/kelola-data-alumni', (req, res) => {
    res.render('admin/kelola-data-alumni', {
        title: 'kelola-data-alumni - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        manajemendataalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk data-statistik-alumni
router.get('/data-statistik-alumni', (req, res) => {
    res.render('admin/data-statistik-alumni', {
        title: 'data-statistik-alumni - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk kelola-postingan
router.get('/kelola-postingan', (req, res) => {
    res.render('admin/kelola-postingan', {
        title: 'kelola-postingan - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk kelola-penghargaan
router.get('/kelola-penghargaan', (req, res) => {
    res.render('admin/kelola-penghargaan', {
        title: 'kelola-penghargaan - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk content-management
router.get('/kirim-notif', (req, res) => {
    res.render('admin/kirim-notif', {
        title: 'kirim-notif - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk content-management
router.get('/lihat-alumni', (req, res) => {
    const alumni = [
        {
            id: 1,
            nama: 'Andi Pratama',
            jurusan: 'Teknik Informatika',
            tahun: 2020,
            pekerjaan: 'Software Engineer - Gojek',
            foto: 'https://via.placeholder.com/100',
        },
        {
            id: 2,
            nama: 'Siti Aisyah',
            jurusan: 'Sistem Informasi',
            tahun: 2019,
            pekerjaan: 'Data Analyst - Tokopedia',
            foto: 'https://via.placeholder.com/100',
        },
    ];
    res.render('admin/lihat-alumni', {
        alumni,
        title: 'lihat-alumni - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

// Route untuk content-management
router.get('/upload-berita-agenda', (req, res) => {
    res.render('admin/upload-berita-agenda', {
        title: 'upload-berita-agenda - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
        // Data forum yang akan dikelola
        datastatistikalumni: [], // nanti bisa diisi dari database
    });
});

//
// Route tambahan admin lainnya (contoh)
router.get('/users', (req, res) => {
    res.render('admin/users', {
        title: 'User Management - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
    });
});

router.get('/settings', (req, res) => {
    res.render('admin/settings', {
        title: 'Settings - Admin Panel',
        layout: 'admin/layout',
        user: req.user || null,
    });
});

module.exports = router;
