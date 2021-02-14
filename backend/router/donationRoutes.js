
var express = require('express')
const DonationController = require('../controller/donationController')
const verifyToken = require('../controller/verifyToken')
var api = express.Router()

api.get('/', verifyToken.auth, DonationController.getDonations) 
api.get('/filter', verifyToken.auth, DonationController.getDonationFiltered) 
api.get('/:id', verifyToken.auth, DonationController.getDonation ) 
//api.get('/ultimoDato', verifyToken.auth , DonationController.getUltimoDonation ) 
api.post('/', verifyToken.auth, DonationController.saveDonation) 
api.patch('/:idDonation/reserve', verifyToken.auth, DonationController.reserveDonation) 
api.delete('/:idDonation/reserve', verifyToken.auth, DonationController.deReserveDonation) 
api.put('/:id', verifyToken.auth, DonationController.updateDonation) 
api.delete('/:id', verifyToken.auth, DonationController.deleteDonation) 

module.exports = api
