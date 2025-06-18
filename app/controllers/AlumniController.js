const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

// Get all alumni with pagination and filters
exports.getAllAlumni = async (req, res) => {
    try {
        const { search, prodi, tahunLulus, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = {};

        if (search) {
            where.OR = [{ nim: { contains: search } }, { email: { contains: search } }, { profile: { nama_lengkap: { contains: search } } }];
        }

        if (prodi) {
            where.profile = { ...where.profile, program_studi: prodi };
        }

        if (tahunLulus) {
            where.profile = { ...where.profile, tahun_lulus: parseInt(tahunLulus) };
        }

        const alumni = await prisma.alumni.findMany({
            where,
            include: { profile: true },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { created_at: 'desc' },
        });

        const total = await prisma.alumni.count({ where });

        res.json({
            data: alumni,
            meta: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get alumni by ID
exports.getAlumniById = async (req, res) => {
    try {
        const { id } = req.params;
        const alumni = await prisma.alumni.findUnique({
            where: { id: parseInt(id) },
            include: { profile: true },
        });

        if (!alumni) {
            return res.status(404).json({ error: 'Alumni not found' });
        }

        res.json(alumni);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new alumni
exports.createAlumni = async (req, res) => {
    try {
        const { nim, email, password, nama_lengkap, jenis_kelamin, program_studi, tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang, nama_perusahaan, bidang_industri, instagram, linkedin, foto_profil } = req.body;

        // Check if alumni already exists
        const existingAlumni = await prisma.alumni.findFirst({
            where: { OR: [{ nim }, { email }] },
        });

        if (existingAlumni) {
            return res.status(400).json({
                error: 'Alumni with this NIM or email already exists',
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create alumni with profile
        const alumni = await prisma.alumni.create({
            data: {
                nim,
                email,
                password: hashedPassword,
                profile: {
                    create: {
                        nama_lengkap,
                        jenis_kelamin,
                        program_studi,
                        tahun_masuk: parseInt(tahun_masuk),
                        tahun_lulus: parseInt(tahun_lulus),
                        alamat,
                        kota,
                        pekerjaan_sekarang,
                        nama_perusahaan,
                        bidang_industri,
                        instagram,
                        linkedin,
                        foto_profil,
                    },
                },
            },
            include: { profile: true },
        });

        res.status(201).json(alumni);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update alumni
exports.updateAlumni = async (req, res) => {
    try {
        const { id } = req.params;
        const { nim, email, nama_lengkap, jenis_kelamin, program_studi, tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang, nama_perusahaan, bidang_industri, instagram, linkedin, foto_profil } = req.body;

        // Check if alumni exists
        const existingAlumni = await prisma.alumni.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingAlumni) {
            return res.status(404).json({ error: 'Alumni not found' });
        }

        // Check if NIM or email is taken by another alumni
        const conflictAlumni = await prisma.alumni.findFirst({
            where: {
                AND: [{ id: { not: parseInt(id) } }, { OR: [{ nim }, { email }] }],
            },
        });

        if (conflictAlumni) {
            return res.status(400).json({
                error: 'NIM or email already used by another alumni',
            });
        }

        // Update alumni
        const updatedAlumni = await prisma.alumni.update({
            where: { id: parseInt(id) },
            data: {
                nim,
                email,
                profile: {
                    update: {
                        nama_lengkap,
                        jenis_kelamin,
                        program_studi,
                        tahun_masuk: parseInt(tahun_masuk),
                        tahun_lulus: parseInt(tahun_lulus),
                        alamat,
                        kota,
                        pekerjaan_sekarang,
                        nama_perusahaan,
                        bidang_industri,
                        instagram,
                        linkedin,
                        foto_profil,
                    },
                },
            },
            include: { profile: true },
        });

        res.json(updatedAlumni);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete alumni
exports.deleteAlumni = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if alumni exists
        const alumni = await prisma.alumni.findUnique({
            where: { id: parseInt(id) },
        });

        if (!alumni) {
            return res.status(404).json({ error: 'Alumni not found' });
        }

        // Delete alumni and profile (cascade)
        await prisma.alumni.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Alumni deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all alumni for printing (without pagination)
exports.getAllForPrint = async (req, res) => {
    try {
        const { search, prodi, tahunLulus } = req.query;

        const where = {};

        if (search) {
            where.OR = [{ nim: { contains: search } }, { email: { contains: search } }, { profile: { nama_lengkap: { contains: search } } }];
        }

        if (prodi) {
            where.profile = { ...where.profile, program_studi: prodi };
        }

        if (tahunLulus) {
            where.profile = { ...where.profile, tahun_lulus: parseInt(tahunLulus) };
        }

        const alumni = await prisma.alumni.findMany({
            where,
            include: { profile: true },
            orderBy: { created_at: 'desc' },
        });

        res.json(alumni);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
