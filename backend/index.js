

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression');
const helmet = require('helmet');
const dotenv = require('dotenv')
const donationRoutes = require('./router/donationRoutes')
const userRoutes = require('./router/userRoutes')
const morgan = require('morgan')
const app = express()
app.use(express.urlencoded());
app.use(express.json())
app.use(compression());
app.use(helmet());
app.use( cors() )
app.use( morgan('tiny') )  //dev
dotenv.config()

app.use('/api/donation',donationRoutes)
app.use('/api/user',userRoutes)

app.get('/', (req, res)=>{
    res.status(200).send('Bienvenid@ o API de doazones do 3er Sector')
})

var port = process.env.PORT || 3000
var mondoBD = process.env.URL_BASEDATOS
const run = async () => {
    await mongoose.connect(mondoBD, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    await app.listen(port)
    console.log('Servidor y base de datos encendidos correctamente')
}

run().catch(error => console.log('Fallo al arrancar:'+error))

