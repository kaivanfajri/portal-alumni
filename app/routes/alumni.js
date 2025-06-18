const express = require('express');
const router = express.Router();

// Middleware untuk memastikan hanya alumni yang bisa akses
// (opsional - sesuaikan dengan sistem authentication Anda)
const requireAlumni = (req, res, next) => {
    // Contoh pengecekan alumni - sesuaikan dengan sistem Anda
    if (req.user && req.user.role === 'alumni') {
        next();
    } else {
        res.redirect('/auth/login'); // atau halaman error 403
    }
};

// Terapkan middleware ke semua route alumni
// router.use(requireAlumni);

router.get('/', (req, res) => {
    res.render('../views/index.ejs', {
        title: 'Alumni Panel',
        user: req.user || null,
    });
});

router.get('/bookmarks', (req, res) => {
    res.render('alumni/bookmarks', {
        title: 'cari-alumni- Alumni Panel',
        user: req.user || null,
    });
});

router.get('/cari-alumni', (req, res) => {
    res.render('alumni/cari-alumni', {
        title: 'cari-alumni - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/detail-job', (req, res) => {
    res.render('alumni/detail-job', {
        title: 'detail-job - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/list-job', (req, res) => {
    res.render('alumni/list-job', {
        title: 'list-job - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/upload-job', (req, res) => {
    res.render('alumni/upload-job', {
        title: 'upload-job - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/detail-konten', (req, res) => {
    res.render('alumni/detail-konten', {
        title: 'detail-konten - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/detail-forum', (req, res) => {
    res.render('alumni/detail-forum', {
        title: 'detail-forum - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/kalender', (req, res) => {
    res.render('alumni/kalender', {
        title: 'kalender - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/list-forum', (req, res) => {
    res.render('alumni/list-forum', {
        title: 'list-forum - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/kritik-saran', (req, res) => {
    res.render('alumni/kritik-saran', {
        title: 'kritik-saran - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/upload-forum', (req, res) => {
    res.render('alumni/upload-forum', {
        title: 'upload-forum - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/upload-postingan', (req, res) => {
    res.render('alumni/upload-postingan', {
        title: 'upload-postingan - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/berita-agenda', (req, res) => {
    res.render('alumni/berita-agenda', {
        title: 'berita-agenda - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/faq', (req, res) => {
    res.render('alumni/faq', {
        title: 'faq - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/list-galeri', (req, res) => {
    res.render('alumni/list-galeri', {
        title: 'galeri - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/profile-alumni', (req, res) => {
    res.render('alumni/profile-alumni', {
        title: 'profile-alumni - Alumni Panel',
        user: req.user || null,
    });
});

router.get('/edit-profile-alumni', (req, res) => {
    res.render('alumni/edit-profile-alumni', {
        title: 'edit-profile-alumni - Alumni Panel',
        user: req.user || null,
    });
});

module.exports = router;

const ForumController = require('../controllers/ForumController');

// Rute untuk upload forum
router.post('/upload-forum', ForumController.addForum);

// Rute-rute lainnya...
module.exports = router;

