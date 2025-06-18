const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jobController = require('../controllers/JobController'); // Pastikan controller sudah terhubung dengan benar

// Middleware untuk memastikan hanya alumni yang bisa akses route ini
const requireAlumni = (req, res, next) => {
<<<<<<< HEAD
  if (req.user && req.user.role === 'alumni') {
    next();
  } else {
    res.redirect('/login'); // Redirect ke halaman login jika bukan alumni
  }
};

// Middleware untuk memastikan hanya admin yang bisa mengakses route ini
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.redirect('/login'); // Redirect ke halaman login jika bukan admin
  }
};

// Konfigurasi Multer untuk meng-handle file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Tempat penyimpanan file upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file berdasarkan timestamp
  },
});

const upload = multer({ storage });

// Route untuk menampilkan daftar lowongan pekerjaan (hanya yang disetujui)
router.get('/list-job', async (req, res) => {
  try {
    const jobs = await prisma.lowonganKerja.findMany({
      where: {
        status_moderasi: 'disetujui', // Hanya tampilkan lowongan yang disetujui
      },
      include: {
        kategori: true, // Sertakan detail kategori
        alumni: true,   // Sertakan informasi alumni
      },
=======
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
>>>>>>> 8b7858bcfdfd1c1470eb5684b97cbc809435a5fc
    });

<<<<<<< HEAD
    res.render('alumni/list-job', {
      title: 'Daftar Lowongan - Alumni Panel',
      layout: 'Alumni/layout',
      user: req.user || null,
      jobs: jobs, // Kirim data lowongan yang disetujui ke view
=======
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
>>>>>>> 8b7858bcfdfd1c1470eb5684b97cbc809435a5fc
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
  }
});

<<<<<<< HEAD
// Route untuk form pengajuan lowongan oleh alumni
router.get('/upload-job', (req, res) => {
  res.render('alumni/upload-job', {
    title: 'Upload Lowongan - Alumni Panel',
    layout: 'Alumni/layout',
    user: req.user || null,
  });
});

// Route untuk menangani pengajuan lowongan pekerjaan oleh alumni
router.post('/upload-job', upload.single('jobImage'), jobController.createJob);

// Route untuk melihat detail lowongan yang dipilih
router.get('/detail-job/:id', async (req, res) => {
  try {
    const job = await prisma.lowonganKerja.findUnique({
      where: { id: parseInt(req.params.id) }, // Pastikan ID adalah integer
      include: {
        kategori: true, // Sertakan kategori lowongan
        alumni: true,   // Sertakan informasi alumni
      },
=======
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
>>>>>>> 8b7858bcfdfd1c1470eb5684b97cbc809435a5fc
    });

    if (!job || job.status_moderasi !== 'disetujui') {
      return res.status(404).json({ message: 'Lowongan tidak ditemukan atau belum disetujui' });
    }

    res.render('alumni/detail-job', {
      title: 'Detail Lowongan - Alumni Panel',
      layout: 'Alumni/layout',
      user: req.user || null,
      job: job, // Kirim data lowongan yang dipilih ke view
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job details', error: error.message });
  }
});

<<<<<<< HEAD
// Route untuk moderasi job posting (hanya untuk admin)
router.get('/admin/moderasi-job-posting', requireAdmin, jobController.moderateJobPosts);

// Route untuk menyetujui lowongan pekerjaan oleh admin
router.get('/admin/approve-job/:id', requireAdmin, jobController.approveJob);

// Route untuk menolak lowongan pekerjaan oleh admin
router.get('/admin/reject-job/:id', requireAdmin, jobController.rejectJob);

// Route untuk melihat riwayat pengajuan lowongan oleh alumni
router.get('/admin/riwayat-pengajuan', requireAdmin, async (req, res) => {
  try {
    const jobPosts = await prisma.lowonganKerja.findMany({
      where: {
        alumniId: req.user.id, // Hanya ambil lowongan yang di-submit oleh alumni yang login
      },
      include: {
        kategori: true, // Sertakan detail kategori
        alumni: true,   // Sertakan informasi alumni
      },
=======
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
>>>>>>> 8b7858bcfdfd1c1470eb5684b97cbc809435a5fc
    });

    res.render('admin/riwayat-pengajuan', {
      title: 'Riwayat Pengajuan Lowongan - Admin Panel',
      layout: 'admin/layout',
      user: req.user || null,
      jobPosts: jobPosts, // Kirim data lowongan yang sudah diajukan
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job submission history', error: error.message });
  }
});

// Export router untuk digunakan di file app.js atau server utama
module.exports = router;

const ForumController = require('../controllers/ForumController');

// Rute untuk upload forum
router.post('/upload-forum', ForumController.addForum);

// Rute-rute lainnya...
module.exports = router;

