let mongoose = require('mongoose')
let Schema = mongoose.Schema
mongoose.pluralize(null);

let ThirdSector = Schema (
    {
        "NUM ENT": Number,
        "ENT NOME": String,
        "ENT DIRECCION": String
    }
)

module.exports = mongoose.model('third_sector', ThirdSector)
