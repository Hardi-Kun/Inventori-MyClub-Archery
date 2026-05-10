const mysql     = require('mysql2')
const moment              = require('moment')

const db        = mysql.createConnection({
    host        : process.env.DB_HOST || 'localhost',
    user        : process.env.DB_USER || 'root',
    password    : process.env.DB_PASSWORD || '',
    database    : process.env.DB_NAME || 'inventaris_myarchery',
})
db.connect()

function eksekusi(script_sql_dan_data) {
    return new Promise((resolve, reject) => {
        db.query(script_sql_dan_data, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

module.exports = {
    eksekusi, db
}