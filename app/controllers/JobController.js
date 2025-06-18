const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const multer = require('multer');

// Konfigurasi Multer untuk meng-handle file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Tentukan folder penyimpanan file upload
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file berdasarkan timestamp
  },
});

const upload = multer({ storage });

// Controller untuk membuat postingan lowongan oleh alumni
exports.createJob = async (req, res) => {
  try {
    // Ambil data dari form
    const { jobTitle, jobDescription } = req.body;
    const jobImage = req.file ? req.file.path : null; // Menyimpan path gambar jika ada

    // Ambil alumniId dari user login dan kategoriId default 1
    const alumniId = req.user && req.user.id ? req.user.id : null;
    const kategoriId = 1; // default kategori jika tidak ada input kategori

    // Validasi data yang diperlukan
    if (!jobTitle || !jobDescription || !jobImage || !alumniId) {
      return res.status(400).json({ message: 'Semua data harus diisi dengan lengkap!' });
    }

    // Simpan data lowongan ke dalam database dengan status 'pending'
    const newJob = await prisma.lowonganKerja.create({
      data: {
        alumniId: alumniId,
        judul_lowongan: jobTitle,
        kategoriId: kategoriId,
        deskripsi: jobDescription,
        gambar: jobImage, // Menyimpan gambar yang diupload
        status_moderasi: 'pending',  // Status lowongan diatur menjadi 'pending' untuk moderasi admin
      },
    });

    console.log('Lowongan Dibuat:', newJob);  // Log pekerjaan yang berhasil dibuat

    // Setelah lowongan berhasil disubmit, alihkan ke halaman moderasi job posting admin
    res.redirect('/admin/moderasi-job-posting');
  } catch (error) {
    console.error('Error posting job:', error); // Log error yang terjadi
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
};

// Controller untuk melihat daftar lowongan yang disetujui
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.lowonganKerja.findMany({
      where: {
        status_moderasi: 'disetujui',  // Hanya tampilkan yang disetujui
      },
    });

    // Render daftar lowongan yang disetujui
    res.render('alumni/list-job', {
      title: 'Daftar Lowongan - Alumni Panel',
      layout: 'Alumni/layout',
      user: req.user || null,
      jobs: jobs,  // Kirim data lowongan yang disetujui ke view
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving jobs for list', error: error.message });
  }
};

// Controller untuk melihat detail job yang dipilih (hanya untuk job yang disetujui)
exports.getJobDetail = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    const job = await prisma.lowonganKerja.findUnique({
      where: { id: jobId },
    });

    if (!job || job.status_moderasi !== 'disetujui') {
      return res.status(404).json({ message: 'Job not found or not approved' });
    }

    res.render('alumni/detail-job', {
      title: 'Detail Job - Alumni Panel',
      layout: 'Alumni/layout',
      user: req.user || null,
      job: job,  // Kirim data job ke view
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job details', error: error.message });
  }
};

module.exports.upload = upload;
