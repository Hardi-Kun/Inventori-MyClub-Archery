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
            // validasi kode tidak boleh kosong
            if (!req.body.form_kode || req.body.form_kode.trim() == '') {
                return res.redirect('/alat/tambah?notif=Kode alat tidak boleh kosong!')
            }
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

    ekspor_excel: async (req, res) => {
    try {
        const xlsx      = require('xlsx')
        const alat      = await alatModel.getAll()

        // format data
        const data = alat.map((item, index) => ({
            'No'                : index + 1,
            'Kode'              : item.kode,
            'Nama Alat'         : item.nama,
            'Kategori'          : item.kategori,
            'Tipe'              : item.tipe || '-',
            'Stok'              : item.stok,
            'Kondisi'           : item.kondisi,
            'Status'            : item.status,
            'Lokasi'            : item.lokasi || '-',
            'Tgl Pembelian'     : item.tgl_pembelian ? moment(item.tgl_pembelian).format('DD-MM-YYYY') : '-',
        }))

        const worksheet     = xlsx.utils.json_to_sheet(data)
        const workbook      = xlsx.utils.book_new()
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Inventaris Alat')

        const filename = `inventaris_myarchery_${moment().format('YYYYMMDD_HHmmss')}.xlsx`
        const buffer   = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })

        res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.send(buffer)

    } catch (error) {
        res.redirect('/alat?notif=' + error.message)
    }
},
}