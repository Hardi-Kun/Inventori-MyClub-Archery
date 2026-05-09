const express       = require('express')
const app           = express()
const port          = 5000
const c_alat        = require('./controller/c_alat')
const c_pinjaman    = require('./controller/c_pinjaman')

app.use( express.urlencoded({extended:false}))
app.use( express.static('public'))
app.set('view engine', 'ejs') 
app.set('views', './view') 

// ======= ROUTE ALAT =======
app.get('/alat',                        c_alat.hal_index)
app.get('/alat/tambah',                 c_alat.hal_form_tambah)
app.post('/alat/tambah',                c_alat.proses_tambah)
app.get('/alat/edit/:kode',             c_alat.hal_form_edit)
app.post('/alat/edit/:kode',            c_alat.proses_edit)
app.get('/alat/hapus/:kode',            c_alat.proses_hapus)
app.get('/alat/filter/:kategori',       c_alat.filter_kategori)
app.get('/alat/status/:status',         c_alat.filter_status)
app.get('/alat/ekspor',                 c_alat.ekspor_excel)

// ======= ROUTE PINJAMAN =======
app.get('/pinjaman',                    c_pinjaman.hal_index)
app.get('/pinjaman/tambah',             c_pinjaman.hal_form_tambah)
app.post('/pinjaman/tambah',            c_pinjaman.proses_tambah)
app.post('/pinjaman/kembalikan/:id',    c_pinjaman.proses_kembalikan)
app.get('/pinjaman/hapus/:id',          c_pinjaman.proses_hapus)

app.get('/', (req, res) => {
    res.redirect('/alat')
})


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})