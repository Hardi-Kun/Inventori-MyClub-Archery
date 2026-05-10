const mysql               = require('mysql2')
const config_database     = require('../config/database')
const moment              = require('moment')
const db                  = config_database.db
const eksekusi            = config_database.eksekusi

module.exports =
{
    getSemua: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM perawatan ORDER BY id DESC`
        )
        return eksekusi(sqlSyntax)
    },

    getAktif: () => {
        let sqlSyntax = mysql.format(
            `SELECT * FROM perawatan WHERE status_perbaikan != 'Selesai' ORDER BY id DESC`
        )
        return eksekusi(sqlSyntax)
    },

    insert: function(req) {
        let sqlData = {
            kode_alat           : req.body.form_kode_alat,
            nama_alat           : req.body.form_nama_alat,
            masalah             : req.body.form_masalah,
            tgl_lapor           : req.body.form_tgl_lapor,
            status_perbaikan    : req.body.form_status_perbaikan,
            created_at          : moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let sqlSyntax = mysql.format(
            `INSERT INTO perawatan SET ?`,
            [sqlData]
        )
        return eksekusi(sqlSyntax)
    },

    selesai: function(req) {
        let sqlData = {
            status_perbaikan    : 'Selesai',
            updated_at          : moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        let id = req.params.id
        let sqlSyntax = mysql.format(
            `UPDATE perawatan SET ? WHERE id = ?`,
            [sqlData, id]
        )
        return eksekusi(sqlSyntax)
    },

    hapus: (id) => {
        let sqlSyntax = mysql.format(
            `DELETE FROM perawatan WHERE id = ?`,
            [id]
        )
        return eksekusi(sqlSyntax)
    },
}