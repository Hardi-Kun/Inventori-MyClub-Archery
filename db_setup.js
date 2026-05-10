require('dotenv').config()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_NAME,
    port        : process.env.DB_PORT || 3306
})

db.connect((err) => {
    if (err) {
        console.log('Gagal konek:', err.message)
        return
    }
    console.log('Berhasil konek ke database!')
})

const queries = [
    `CREATE TABLE IF NOT EXISTS alat (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kode VARCHAR(20) UNIQUE NOT NULL,
        nama VARCHAR(100) NOT NULL,
        kategori VARCHAR(50),
        tipe VARCHAR(100),
        stok INT DEFAULT 1,
        kondisi VARCHAR(50),
        status VARCHAR(50) DEFAULT 'Tersedia',
        lokasi VARCHAR(100),
        tgl_pembelian DATE,
        created_at DATETIME,
        updated_at DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS peminjaman (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kode_alat VARCHAR(20),
        nama_alat VARCHAR(100),
        peminjam VARCHAR(100),
        tgl_pinjam DATE,
        tgl_rencana_kembali DATE,
        tgl_kembali DATE,
        status VARCHAR(50) DEFAULT 'Dipinjam',
        keterangan TEXT,
        created_at DATETIME
    )`,
    `CREATE TABLE IF NOT EXISTS perawatan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kode_alat VARCHAR(20),
        nama_alat VARCHAR(100),
        masalah TEXT,
        tgl_lapor DATE,
        status_perbaikan VARCHAR(50) DEFAULT 'Menunggu',
        created_at DATETIME,
        updated_at DATETIME
    )`
]

let completed = 0
queries.forEach((query) => {
    db.query(query, (err) => {
        if (err) {
            console.log('Error:', err.message)
        } else {
            completed++
            console.log(`Tabel ${completed} berhasil dibuat!`)
        }
        if (completed === queries.length) {
            console.log('Semua tabel berhasil dibuat!')
            db.end()
        }
    })
})