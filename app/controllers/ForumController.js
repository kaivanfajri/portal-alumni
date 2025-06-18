// Ganti import db dengan Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Fungsi untuk menambah forum diskusi baru (async/await)
    addForum: async (req, res) => {
        const { judul, deskripsi } = req.body;

        try {
            // Gunakan Prisma untuk insert data
            const newForum = await prisma.forumDiskusi.create({
                data: {
                    judul: judul,
                    isi: deskripsi, // Sesuaikan dengan nama field di schema.prisma
                },
            });

            res.status(201).json({
                message: 'Forum berhasil ditambahkan',
                data: newForum,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Terjadi kesalahan saat menambah forum',
                error: err.message,
            });
        }
    },
};
