const mysql               = require('mysql2')
const config_database     = require('../config/database')
const moment              = require('moment')
const db                  = config_database.db
const eksekusi            = config_database.eksekusi

module.exports =
{
    getAll: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM alat ORDER BY id DESC`
        )
        return eksekusi(sqlSyntax)
    },

    getByKode: (kode) => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM alat WHERE kode = ?`,
            [kode]
        )
        return eksekusi(sqlSyntax)
    },

    getByKategori: (kategori) => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM alat WHERE kategori = ?`,
            [kategori]
        )
        return eksekusi(sqlSyntax)
    },

    getByStatus: (status) => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM alat WHERE status = ?`,
            [status]
        )
        return eksekusi(sqlSyntax)
    },

    getRekap: () => {
        let sqlSyntax = mysql.format(
            `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'Tersedia' THEN 1 ELSE 0 END) as tersedia,
                SUM(CASE WHEN status = 'Dipinjam' THEN 1 ELSE 0 END) as dipinjam,
                SUM(CASE WHEN status = 'Rusak' THEN 1 ELSE 0 END) as rusak,
                SUM(CASE WHEN kondisi = 'Perlu Perbaikan' THEN 1 ELSE 0 END) as perlu_perbaikan
            FROM alat`
        )
        return eksekusi(sqlSyntax)
    },

    insert: function(req) {
        let sqlData = {
            kode            : req.body.form_kode,
            nama            : req.body.form_nama,
            kategori        : req.body.form_kategori,
            tipe            : req.body.form_tipe,
            stok            : req.body.form_stok,
            kondisi         : req.body.form_kondisi,
            status          : req.body.form_status,
            lokasi          : req.body.form_lokasi,
            tgl_pembelian   : req.body.form_tgl_pembelian,
            created_at      : moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let sqlSyntax = mysql.format(
            `INSERT INTO alat SET ?`,
            [sqlData]
        )
        return eksekusi(sqlSyntax)
    },

    update: function(req) {
        let sqlData = {
            nama            : req.body.form_nama,
            kategori        : req.body.form_kategori,
            tipe            : req.body.form_tipe,
            stok            : req.body.form_stok,
            kondisi         : req.body.form_kondisi,
            status          : req.body.form_status,
            lokasi          : req.body.form_lokasi,
            tgl_pembelian   : req.body.form_tgl_pembelian,
            updated_at      : moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let kode = req.params.kode
        let sqlSyntax = mysql.format(
            `UPDATE alat SET ? WHERE kode = ?`,
            [sqlData, kode]
        )
        return eksekusi(sqlSyntax)
    },

    hapus: (kode) => {
        let sqlSyntax = mysql.format(
            `DELETE FROM alat WHERE kode = ?`,
            [kode]
        )
        return eksekusi(sqlSyntax)
    },
}