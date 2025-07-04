const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');
const { upload } = require('../controllers/JobController');

// Middleware untuk memastikan hanya alumni yang bisa akses
// (opsional - sesuaikan dengan sistem authentication Anda)
function requireAlumni(req, res, next) {
  // Contoh pengecekan alumni - sesuaikan dengan sistem Anda
  if (req.user && req.user.role === 'alumni') {
    next();
  } else {
    res.redirect('/login'); // atau halaman error 403
  }
}

// Terapkan middleware ke semua route alumni
// router.use(requireAlumni); // Uncomment jika ingin mengaktifkan

// Route tambahan alumni lainnya (contoh)
router.get('/', (req, res) => {
    res.render('../views/index.ejs', {
        title: 'Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/bookmarks', (req, res) => {
    res.render('alumni/bookmarks', {
        title: 'cari-alumni- Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/cari-alumni', (req, res) => {
    res.render('alumni/cari-alumni', {
        title: 'cari-alumni - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/job-detail', JobController.getJobDetail,(req, res) => {
    res.render('alumni/job-detail', {
        title: 'job-detail - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/job-list', JobController.getAllJobs,(req, res) => {
    res.render('alumni/job-list', {
        title: 'job-list - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/upload-job', (req, res) => {
    res.render('alumni/upload-job', {
        title: 'upload-job - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route POST untuk submit form upload job
router.post('/upload-job', upload.single('jobImage'), JobController.createJob);

// Route tambahan alumni lainnya (contoh)
router.get('/detail-konten', (req, res) => {
    res.render('alumni/detail-konten', {
        title: 'detail-konten - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/detail-forum', (req, res) => {
    res.render('alumni/detail-forum', {
        title: 'detail-forum - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/kalender', (req, res) => {
    res.render('alumni/kalender', {
        title: 'kalender - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/list-forum', (req, res) => {
    res.render('alumni/list-forum', {
        title: 'list-forum - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/kritik-saran', (req, res) => {
    res.render('alumni/kritik-saran', {
        title: 'kritik-saran - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/upload-forum', (req, res) => {
    res.render('alumni/upload-forum', {
        title: 'upload-forum - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/upload-postingan', (req, res) => {
    res.render('alumni/upload-postingan', {
        title: 'upload-postingan - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/berita-agenda', (req, res) => {
    res.render('alumni/berita-agenda', {
        title: 'berita-agenda - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/faq', (req, res) => {
    res.render('alumni/faq', {
        title: 'faq - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route tambahan alumni lainnya (contoh)
router.get('/galeri', (req, res) => {
    res.render('alumni/galeri', {
        title: 'galeri - Alumni Panel',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route dashboard alumni
router.get('/dashboard', (req, res) => {
    res.render('alumni/dashboard', {
        title: 'Dashboard Alumni',
        layout: 'Alumni/layout',
        user: req.user || null,
    });
});

// Route untuk daftar lowongan kerja (list-job)
router.get('/list-job', JobController.getAllJobs);

// Route untuk detail lowongan kerja (detail-job/:id)
router.get('/detail-job/:id', JobController.getJobDetail);

module.exports = router;