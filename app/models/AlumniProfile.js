// models/AlumniProfile.js
const db = require('../config/database');

class AlumniProfile {
    static async findByAlumniId(alumniId) {
        const query = 'SELECT * FROM alumni_profiles WHERE alumni_id = ?';
        const [rows] = await db.execute(query, [alumniId]);
        return rows[0];
    }

    static async create(data) {
        const { alumni_id, nama_lengkap, jenis_kelamin, program_studi, tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang, nama_perusahaan, bidang_industri, instagram, linkedin, foto_profil } = data;

        const query = `
            INSERT INTO alumni_profiles (
                alumni_id, nama_lengkap, jenis_kelamin, program_studi,
                tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang,
                nama_perusahaan, bidang_industri, instagram, linkedin,
                foto_profil, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const [result] = await db.execute(query, [alumni_id, nama_lengkap, jenis_kelamin, program_studi, tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang, nama_perusahaan, bidang_industri, instagram, linkedin, foto_profil]);

        return result.insertId;
    }

    static async updateByAlumniId(alumniId, data) {
        const { nama_lengkap, jenis_kelamin, program_studi, tahun_masuk, tahun_lulus, alamat, kota, pekerjaan_sekarang, nama_perusahaan, bidang_industri, instagram, linkedin, foto_profil } = data;

        let updateFields = [];
        let values = [];

        // Hanya update field yang ada nilainya
        if (nama_lengkap !== undefined) {
            updateFields.push('nama_lengkap = ?');
            values.push(nama_lengkap);
        }
        if (jenis_kelamin !== undefined) {
            updateFields.push('jenis_kelamin = ?');
            values.push(jenis_kelamin);
        }
        if (program_studi !== undefined) {
            updateFields.push('program_studi = ?');
            values.push(program_studi);
        }
        if (tahun_masuk !== undefined) {
            updateFields.push('tahun_masuk = ?');
            values.push(tahun_masuk);
        }
        if (tahun_lulus !== undefined) {
            updateFields.push('tahun_lulus = ?');
            values.push(tahun_lulus);
        }
        if (alamat !== undefined) {
            updateFields.push('alamat = ?');
            values.push(alamat);
        }
        if (kota !== undefined) {
            updateFields.push('kota = ?');
            values.push(kota);
        }
        if (pekerjaan_sekarang !== undefined) {
            updateFields.push('pekerjaan_sekarang = ?');
            values.push(pekerjaan_sekarang);
        }
        if (nama_perusahaan !== undefined) {
            updateFields.push('nama_perusahaan = ?');
            values.push(nama_perusahaan);
        }
        if (bidang_industri !== undefined) {
            updateFields.push('bidang_industri = ?');
            values.push(bidang_industri);
        }
        if (instagram !== undefined) {
            updateFields.push('instagram = ?');
            values.push(instagram);
        }
        if (linkedin !== undefined) {
            updateFields.push('linkedin = ?');
            values.push(linkedin);
        }
        if (foto_profil !== undefined) {
            updateFields.push('foto_profil = ?');
            values.push(foto_profil);
        }

        if (updateFields.length === 0) {
            return false; // Tidak ada yang diupdate
        }

        updateFields.push('updated_at = NOW()');
        values.push(alumniId);

        const query = `UPDATE alumni_profiles SET ${updateFields.join(', ')} WHERE alumni_id = ?`;
        const [result] = await db.execute(query, values);
        return result.affectedRows > 0;
    }

    static async deleteByAlumniId(alumniId) {
        const query = 'DELETE FROM alumni_profiles WHERE alumni_id = ?';
        const [result] = await db.execute(query, [alumniId]);
        return result.affectedRows > 0;
    }

    static async getProfilesByProgramStudi(programStudi) {
        const query = `
            SELECT ap.*, a.email, a.nim, a.status
            FROM alumni_profiles ap
            INNER JOIN alumni a ON ap.alumni_id = a.id
            WHERE ap.program_studi = ?
            ORDER BY ap.tahun_lulus DESC
        `;
        const [rows] = await db.execute(query, [programStudi]);
        return rows;
    }

    static async getProfilesByTahunLulus(tahunLulus) {
        const query = `
            SELECT ap.*, a.email, a.nim, a.status
            FROM alumni_profiles ap
            INNER JOIN alumni a ON ap.alumni_id = a.id
            WHERE ap.tahun_lulus = ?
            ORDER BY ap.nama_lengkap ASC
        `;
        const [rows] = await db.execute(query, [tahunLulus]);
        return rows;
    }

    static async getStatistics() {
        const queries = {
            totalProfiles: 'SELECT COUNT(*) as count FROM alumni_profiles',
            byProgramStudi: `
                SELECT program_studi, COUNT(*) as count 
                FROM alumni_profiles 
                GROUP BY program_studi
            `,
            byTahunLulus: `
                SELECT tahun_lulus, COUNT(*) as count 
                FROM alumni_profiles 
                WHERE tahun_lulus IS NOT NULL
                GROUP BY tahun_lulus 
                ORDER BY tahun_lulus DESC
            `,
            employed: `
                SELECT COUNT(*) as count 
                FROM alumni_profiles 
                WHERE pekerjaan_sekarang IS NOT NULL 
                AND pekerjaan_sekarang != ''
            `,
        };

        const results = {};

        // Total profiles
        const [totalRows] = await db.execute(queries.totalProfiles);
        results.totalProfiles = totalRows[0].count;

        // By program studi
        const [programRows] = await db.execute(queries.byProgramStudi);
        results.byProgramStudi = programRows;

        // By tahun lulus
        const [tahunRows] = await db.execute(queries.byTahunLulus);
        results.byTahunLulus = tahunRows;

        // Employed
        const [employedRows] = await db.execute(queries.employed);
        results.employed = employedRows[0].count;

        return results;
    }
}

module.exports = AlumniProfile;
