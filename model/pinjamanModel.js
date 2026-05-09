const mysql               = require('mysql2')
const config_database     = require('../config/database')
const moment              = require('moment')
const db                  = config_database.db
const eksekusi            = config_database.eksekusi

module.exports =
{
    getSemua: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM peminjaman ORDER BY id DESC`
        )
        return eksekusi(sqlSyntax)
    },

    getAktif: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM peminjaman WHERE status = 'Dipinjam' ORDER BY id DESC`
        )
        return eksekusi(sqlSyntax)
    },

    getTerlambat: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM peminjaman WHERE status = 'Dipinjam' AND tgl_rencana_kembali < CURDATE()`
        )
        return eksekusi(sqlSyntax)
    },

    insert: function(req) {
        let sqlData = {
            kode_alat           : req.body.form_kode_alat,
            nama_alat           : req.body.form_nama_alat,
            peminjam            : req.body.form_peminjam,
            tgl_pinjam          : req.body.form_tgl_pinjam,
            tgl_rencana_kembali : req.body.form_tgl_rencana_kembali,
            keterangan          : req.body.form_keterangan,
            status              : 'Dipinjam',
            created_at          : moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let sqlSyntax = mysql.format(
            `INSERT INTO peminjaman SET ?`,
            [sqlData]
        )
        return eksekusi(sqlSyntax)
    },

    kembalikan: function(req) {
        let sqlData = {
            status      : 'Kembali',
            tgl_kembali : moment().format('YYYY-MM-DD'),
        }
        let id = req.params.id
        let sqlSyntax = mysql.format(
            `UPDATE peminjaman SET ? WHERE id = ?`,
            [sqlData, id]
        )
        return eksekusi(sqlSyntax)
    },

    hapus: (id) => {
        let sqlSyntax = mysql.format(
            `DELETE FROM peminjaman WHERE id = ?`,
            [id]
        )
        return eksekusi(sqlSyntax)
    },
}