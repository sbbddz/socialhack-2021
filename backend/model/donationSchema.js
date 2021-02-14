let mongoose = require('mongoose')
const { stringify } = require('querystring')
let Schema = mongoose.Schema

let DonationSchema = Schema (
    {
        _id: {type: Schema.ObjectId, auto: true},
        name: { type: Schema.Types.String, required: true},
        description: { type: Schema.Types.String},
        type: { type: Schema.Types.String, required: true},
        expirationDate: {type: Schema.Types.Date, default: () => new Date(+new Date() + 7*24*60*60*1000)},
        creator: {type: Schema.ObjectId, ref:'User'},
        for3Sector: {type: Schema.Types.Boolean, default: true },
        forPublic: {type: Schema.Types.Boolean, default: true },
        address: { type: Schema.Types.String, required: true},
        isActive: {type: Schema.Types.Boolean, default: true },
        picture: String,
        demandant: {type: Schema.ObjectId, ref:'User'},
        demandantMessage: String,
        createdAt: {type: Schema.Types.Date, default: Date.now },

    }
)

module.exports = mongoose.model('Donation', DonationSchema)
