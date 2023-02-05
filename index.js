require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extend: true,
    }),
)

app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person',personRoutes)

app.get('/',(req, res) => {

    res.json({message:'Oi Fernando' })
})

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

let conn = `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.mlezor0.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(conn)
.then(() =>{
    console.log("Conectamos ao MongoDB!")    
    app.listen(3000)})
.catch((err) => console.log(err))

