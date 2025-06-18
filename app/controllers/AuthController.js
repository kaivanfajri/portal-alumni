const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class AuthController {
    // Login Alumni
    static async loginAlumni(req, res) {
        const { nim, password } = req.body;

        try {
            // Cari alumni berdasarkan NIM
            const alumni = await prisma.alumni.findUnique({
                where: { nim },
                include: { profile: true },
            });

            if (!alumni) {
                return res.render('auth/alumni/login', {
                    error: 'NIM tidak terdaftar',
                });
            }

            // Verifikasi password
            const isPasswordValid = await bcrypt.compare(password, alumni.password);
            if (!isPasswordValid) {
                return res.render('auth/alumni/login', {
                    error: 'Password salah',
                });
            }

            // Simpan session
            req.session.user = {
                id: alumni.id,
                nim: alumni.nim,
                role: 'alumni',
                profile: alumni.profile,
            };

            // Redirect ke dashboard alumni
            res.redirect('/alumni/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            res.render('auth/alumni/login', {
                error: 'Terjadi kesalahan saat login',
            });
        }
    }
}

module.exports = AuthController;
