const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware untuk memastikan hanya alumni yang bisa akses
const requireAlumni = (req, res, next) => {
  if (req.user && req.user.role === 'alumni') {
    next();
  } else {
    res.redirect('/login'); // Redirect ke login jika bukan alumni
  }
};

// Middleware untuk memastikan hanya admin yang bisa mengakses route admin
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.redirect('/login'); // Redirect ke login jika bukan admin
  }
};

// Controller untuk membuat postingan lowongan (oleh Alumni)
exports.createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, alumniId, kategoriId } = req.body; // Mengambil data dari form
    const jobImage = req.file ? req.file.path : null; // Menyimpan path gambar jika ada

    // Log data untuk memastikan semuanya diterima dengan benar
    console.log('Data Lowongan:', { jobTitle, jobDescription, alumniId, kategoriId, jobImage });

    // Simpan data lowongan ke dalam database dengan status 'pending'
    const newJob = await prisma.lowonganKerja.create({
      data: {
        judul_lowongan: jobTitle,
        deskripsi: jobDescription,
        alumniId: parseInt(alumniId),  // Pastikan alumniId dalam format integer
        kategoriId: parseInt(kategoriId),  // Pastikan kategoriId dalam format integer
        gambar: jobImage,
        status_moderasi: 'pending',  // Status lowongan diatur menjadi 'pending' untuk moderasi admin
      },
    });

    // Log lowongan yang berhasil dibuat
    console.log('Lowongan Dibuat:', newJob);

    // Setelah lowongan berhasil disubmit, alihkan ke halaman moderasi job posting admin
    res.redirect('/admin/moderasi-job-posting');
  } catch (error) {
    console.error('Error posting job:', error); // Log error yang terjadi
    res.status(500).json({ message: 'Error posting job', error: error.message });
  }
};

// Controller untuk moderasi job posting oleh admin
exports.moderateJobPosts = async (req, res) => {
  try {
    // Mengambil semua lowongan dengan status 'pending' untuk dimoderasi
    const jobPosts = await prisma.lowonganKerja.findMany({
      where: {
        status_moderasi: 'pending',  // Hanya ambil lowongan yang statusnya pending
      },
      include: {
        kategori: true,  // Menyertakan detail kategori lowongan
        alumni: true,    // Menyertakan detail alumni
      },
    });

    // Render halaman moderasi untuk admin
    res.render('admin/moderasi-job-posting', {
      title: 'Moderasi Job Posting - Admin Panel',
      layout: 'admin/layout',
      user: req.user || null,
      moderasijobposting: jobPosts,  // Mengirim data job yang belum dimoderasi ke view
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving job posts for moderation', error: error.message });
  }
};

// Controller untuk menyetujui job posting
exports.approveJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    // Update status lowongan menjadi 'disetujui' (approved)
    const updatedJob = await prisma.lowonganKerja.update({
      where: { id: jobId },
      data: {
        status_moderasi: 'disetujui',  // Update status menjadi 'disetujui'
        tanggal_review: new Date(),  // Menambahkan tanggal review
      },
    });

    console.log('Job Approved:', updatedJob);  // Log pekerjaan yang disetujui

    // Redirect kembali ke halaman moderasi setelah disetujui
    res.redirect('/admin/moderasi-job-posting');
  } catch (error) {
    res.status(500).json({ message: 'Error approving job post', error: error.message });
  }
};

// Controller untuk menolak job posting
exports.rejectJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);

    // Update status lowongan menjadi 'ditolak' (rejected)
    const updatedJob = await prisma.lowonganKerja.update({
      where: { id: jobId },
      data: {
        status_moderasi: 'ditolak',  // Update status menjadi 'ditolak'
      },
    });

    console.log('Job Rejected:', updatedJob);  // Log pekerjaan yang ditolak

    // Redirect kembali ke halaman moderasi setelah ditolak
    res.redirect('/admin/moderasi-job-posting');
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting job post', error: error.message });
  }
};

// Controller untuk melihat semua job yang disetujui
exports.getAllJobs = async (req, res) => {
  try {
    // Fetch hanya lowongan yang disetujui (status 'disetujui')
    const jobs = await prisma.lowonganKerja.findMany({
      where: {
        status_moderasi: 'disetujui',  // Hanya tampilkan yang disetujui
      },
      include: {
        kategori: true,  // Menyertakan kategori lowongan
        alumni: true,    // Menyertakan informasi alumni
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

    // Ambil detail job dengan id yang sesuai
    const job = await prisma.lowonganKerja.findUnique({
      where: { id: jobId },
      include: {
        kategori: true,  // Menyertakan kategori lowongan
        alumni: true,    // Menyertakan informasi alumni
      },
    });

    // Pastikan job ditemukan dan statusnya disetujui
    if (!job || job.status_moderasi !== 'disetujui') {
      return res.status(404).json({ message: 'Job not found or not approved' });
    }

    // Render detail job
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
