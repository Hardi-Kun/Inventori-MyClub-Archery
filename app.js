const express       = require('express')
const app           = express()
const port          = 5000

app.use( express.urlencoded({extended:false}))
app.set('view engine', 'ejs') 
app.set('views', './view') 

app.get('/' , )




app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})