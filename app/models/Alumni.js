// models/Alumni.js
const db = require('../config/database');
const bcrypt = require('bcrypt');

class Alumni {
    static async getAllWithProfiles() {
        const query = `
            SELECT 
                a.id,
                a.nim,
                a.email,
                a.status,
                a.created_at,
                ap.nama_lengkap,
                ap.jenis_kelamin,
                ap.program_studi,
                ap.tahun_masuk,
                ap.tahun_lulus,
                ap.alamat,
                ap.kota,
                ap.pekerjaan_sekarang,
                ap.nama_perusahaan,
                ap.bidang_industri,
                ap.instagram,
                ap.linkedin,
                ap.foto_profil
            FROM alumni a
            LEFT JOIN alumni_profiles ap ON a.id = ap.alumni_id
            ORDER BY a.created_at DESC
        `;
        
        const [rows] = await db.execute(query);
        return rows;
    }

    static async findById(id) {
        const query = `
            SELECT 
                a.*,
                ap.nama_lengkap,
                ap.jenis_kelamin,
                ap.program_studi,
                ap.tahun_masuk,
                ap.tahun_lulus,
                ap.alamat,
                ap.kota,
                ap.pekerjaan_sekarang,
                ap.nama_perusahaan,
                ap.bidang_industri,
                ap.instagram,
                ap.linkedin,
                ap.foto_profil
            FROM alumni a
            LEFT JOIN alumni_profiles ap ON a.id = ap.alumni_id
            WHERE a.id = ?
        `;
        
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM alumni WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    }

    static async findByNim(nim) {
        const query = 'SELECT * FROM alumni WHERE nim = ?';
        const [rows] = await db.execute(query, [nim]);
        return rows[0];
    }

    static async create(data) {
        const { nim, email, password, status = 'active' } = data;
        
        // Hash password jika ada
        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const query = `
            INSERT INTO alumni (nim, email, password, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
        
        const [result] = await db.execute(query, [nim, email, hashedPassword, status]);
        return result.insertId;
    }

    static async update(id, data) {
        const { nim, email, password, status } = data;
        let updateFields = [];
        let values = [];

        if (nim) {
            updateFields.push('nim = ?');
            values.push(nim);
        }
        if (email) {
            updateFields.push('email = ?');
            values.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.push('password = ?');
            values.push(hashedPassword);
        }
        if (status) {
            updateFields.push('status = ?');
            values.push(status);
        }

        updateFields.push('updated_at = NOW()');
        values.push(id);

        const query = `UPDATE alumni SET ${updateFields.join(', ')} WHERE id = ?`;
        const [result] = await db.execute(query, values);
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const query = 'DELETE FROM alumni WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0;
    }

    static async updateStatus(id, status) {
        const query = 'UPDATE alumni SET status = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [status, id]);
        return result.affectedRows > 0;
    }

    static async getStatistics() {
        const queries = {
            total: 'SELECT COUNT(*) as count FROM alumni',
            active: 'SELECT COUNT(*) as count FROM alumni WHERE status = "active"',
            inactive: 'SELECT COUNT(*) as count FROM alumni WHERE status = "inactive"',
            withProfiles: `
                SELECT COUNT(*) as count 
                FROM alumni a 
                INNER JOIN alumni_profiles ap ON a.id = ap.alumni_id
            `
        };

        const results = {};
        for (const [key, query] of Object.entries(queries)) {
            const [rows] = await db.execute(query);
            results[key] = rows[0].count;
        }

        return results;
    }
}

module.exports = Alumni;