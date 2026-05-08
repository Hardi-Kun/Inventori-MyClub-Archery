const express       = require('express')
const app           = express()
const port          = 5000
const c_alat        = require('./controller/c_alat')

app.use( express.urlencoded({extended:false}))
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

app.get('/', (req, res) => {
    res.redirect('/alat')
})


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})