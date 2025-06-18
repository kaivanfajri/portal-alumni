const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    getAllAlumniProfiles: async (req, res) => {
        try {
            const alumniProfiles = await prisma.alumniProfile.findMany({
                include: {
                    alumni: {
                        select: {
                            id: true,
                            nim: true,
                            email: true,
                            status: true,
                            createdAt: true,
                        },
                    },
                },
                orderBy: {
                    nama_lengkap: 'asc',
                },
            });

            res.render('admin/kelola-data-alumni', {
                title: 'Kelola Data Alumni',
                alumniProfiles: alumniProfiles,
                currentPage: 'alumni',
            });
        } catch (error) {
            console.error('Error fetching alumni profiles:', error);

            res.status(500).render('error', {
                title: 'Error',
                error: 'Gagal memuat data alumni',
                message: 'Terjadi kesalahan saat memuat data alumni. Silakan coba lagi nanti.',
            });
        }
    },
};
