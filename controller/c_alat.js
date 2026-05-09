const moment        = require('moment')
const alatModel     = require('../model/alatModel')

module.exports =
{
    hal_index: async (req, res) => {
        let data = {
            req         : req,
            alat        : await alatModel.getAll(),
            rekap       : await alatModel.getRekap(),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/alat/index', data)
    },

    hal_form_tambah: async (req, res) => {
        let data = {
            req         : req,
            notifikasi  : req.query.notif,
        }
        res.render('v_inventaris/alat/form-tambah', data)
    },

    proses_tambah: async (req, res) => {
        try {
            let insert = await alatModel.insert(req)
            if (insert.affectedRows > 0) {
                res.redirect('/alat?notif=Alat berhasil ditambahkan')
            }
        } catch (error) {
            res.redirect('/alat?notif=' + error.message)
        }
    },

    hal_form_edit: async (req, res) => {
        let kode = req.params.kode
        let data = {
            req         : req,
            alat        : await alatModel.getByKode(kode),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/alat/form-edit', data)
    },

    proses_edit: async (req, res) => {
        try {
            let update = await alatModel.update(req)
            if (update.affectedRows > 0) {
                res.redirect('/alat?notif=Alat berhasil diupdate')
            }
        } catch (error) {
            res.redirect('/alat?notif=' + error.message)
        }
    },

    proses_hapus: async (req, res) => {
        try {
            let hapus = await alatModel.hapus(req.params.kode)
            if (hapus.affectedRows > 0) {
                res.redirect('/alat?notif=Alat berhasil dihapus')
            }
        } catch (error) {
            res.redirect('/alat?notif=' + error.message)
        }
    },

    filter_kategori: async (req, res) => {
        let data = {
            req         : req,
            alat        : await alatModel.getByKategori(req.params.kategori),
            rekap       : await alatModel.getRekap(),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/alat/index', data)
    },

    filter_status: async (req, res) => {
        let data = {
            req         : req,
            alat        : await alatModel.getByStatus(req.params.status),
            rekap       : await alatModel.getRekap(),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/alat/index', data)
    },
}