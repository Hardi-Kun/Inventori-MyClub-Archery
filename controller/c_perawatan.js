const moment            = require('moment')
const perawatanModel    = require('../model/perawatanModel')
const alatModel         = require('../model/alatModel')

module.exports =
{
    hal_index: async (req, res) => {
        let data = {
            req         : req,
            perawatan   : await perawatanModel.getSemua(),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/perawatan/index', data)
    },

    hal_form_tambah: async (req, res) => {
        let data = {
            req         : req,
            alat        : await alatModel.getAll(),
            notifikasi  : req.query.notif,
            moment      : moment,
        }
        res.render('v_inventaris/perawatan/form-tambah', data)
    },

    proses_tambah: async (req, res) => {
        try {
            if (!req.body.form_masalah || req.body.form_masalah.trim() == '') {
                return res.redirect('/perawatan/tambah?notif=Masalah tidak boleh kosong!')
            }
            let insert = await perawatanModel.insert(req)
            if (insert.affectedRows > 0) {
                // update kondisi alat jadi Perlu Perbaikan
                await alatModel.updateKondisi(req.body.form_kode_alat, 'Perlu Perbaikan')
                res.redirect('/perawatan?notif=Perawatan berhasil dicatat')
            }
        } catch (error) {
            res.redirect('/perawatan?notif=' + error.message)
        }
    },

    proses_selesai: async (req, res) => {
        try {
            let selesai = await perawatanModel.selesai(req)
            if (selesai.affectedRows > 0) {
                // update kondisi alat jadi Baik
                await alatModel.updateKondisi(req.body.kode_alat, 'Baik')
                res.redirect('/perawatan?notif=Perbaikan berhasil diselesaikan')
            }
        } catch (error) {
            res.redirect('/perawatan?notif=' + error.message)
        }
    },

    proses_hapus: async (req, res) => {
        try {
            let hapus = await perawatanModel.hapus(req.params.id)
            if (hapus.affectedRows > 0) {
                res.redirect('/perawatan?notif=Data perawatan berhasil dihapus')
            }
        } catch (error) {
            res.redirect('/perawatan?notif=' + error.message)
        }
    },
}