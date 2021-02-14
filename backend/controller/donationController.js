let Donation = require('../model/donationSchema')
const fetch = require('node-fetch');

async function getDonations(req, res) {
    const rolUserLogued = req.rolUserLogued
    try {
        let query = {}
        if (rolUserLogued === '3sector') {
            query.for3Sector = true
            query.isActive = true
            query.expirationDate = { $gt: new Date() }
        } else if (rolUserLogued === 'public') {
            query.forPublic = true
            query.isActive = true
            query.expirationDate = { $gt: new Date() }
        } else if (rolUserLogued === 'admin') {

        } else {
            res.status(401).json('Rol incorrecto')
        }
        const findDonations = await Donation.find(query).exec()
        res.status(200).json(findDonations)
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}
async function getDonation(req, res) {
    const donationId = req.params.id
    try {
        const findDonation = await Donation.findById(donationId)
        res.status(200).json(findDonation)
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}

async function getDonationsByCreator(req, res) {
    const rolUserLogued = req.rolUserLogued
    const idUserLogued = req.idUserLogued
    try {
        if (rolUserLogued === 'admin') {
            const findDonations = await Donation.find({})
            res.status(200).json(findDonations)
        } else if (rolUserLogued === '3sector') {
            const findDonations = await Donation.find({ creator: idUserLogued })
            res.status(200).json(findDonations)
        } else {
            res.status(401).json('Rol incorrecto')
        }
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}

async function getDonationFiltered(req, res) {
    const { name } = req.query
    try {
        const nameSearch = { name: { $regex: name } }
        if(!name) {
            const findDonations = await Donation.find({})
            res.status(200).json(findDonations)
        }
        //const addressSearch = { address: { $regex: address } }
        //const typeSearch = { type: { $regex: type } }
        const query = { nameSearch }
        const findDonations = await Donation.find({name: name})
        res.status(200).json(findDonations)
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}



async function saveDonation(req, res) {
    if (req.rolUserLogued !== '3sector') {
        res.status(401).json('No tes permisos')
    }
    const donation = new Donation(req.body)

    try { // Foto random
        if(!donation.picture || donation.picture==''){
            const response = await fetch('https://random.dog/woof.json?ref=apilist.fun')
            const j = await response.json()
            donation.picture = j.file;
        }
    } catch (error) {
        donation.picture='https://img2.freepng.es/20180609/kyx/kisspng-mover-cardboard-box-computer-icons-freight-transpo-aaa-moving-storage-5b1bf98d046c93.0346825815285600130181.jpg'
    }


    try {
        const idUserLogued = req.idUserLogued
        donation.creator = idUserLogued
        donation.demandant = null
        donation.demandantMessage = ''

        
        const saveDonation = await donation.save()
        res.status(200).json('Informacion gardada correctamente')
    } catch (error) {
        res.status(500).json('error:' + error)
    }

}
async function updateDonation(req, res) {
    const donationId = req.params.id
    const donationsBody = req.body
    const idUserLogued = req.idUserLogued
    const rolUserLogued = req.rolUserLogued

    try {
        const donationFound = await Donation.findById(donationId)
        if (donationFound.creator != idUserLogued && rolUserLogued != 'admin') {
            res.status(400).json('A doazón no te pertence')
        }
        
        const updateDonation = await Donation.findByIdAndUpdate(donationId, donationsBody)
        res.status(200).json('Informacion actualizada correctamente')
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}

async function deleteDonation(req, res) {
    const donationId = req.params.id
    const idUserLogued = req.idUserLogued

    try {
        const donationFound = await Donation.findById(donationId)
        if (donationFound.creator != idUserLogued && rolUserLogued != 'admin') {
            res.status(400).json('A doazón no te pertence')
        }

        const deleteDonation = await Donation.findByIdAndRemove(donationId)
        res.status(200).json('Informacion borrada correctamente')
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}


async function reserveDonation(req, res) {
    const idDonation = req.params.idDonation
    const demandantMessage = req.body.demandantMessage
    const idUserLogued = req.idUserLogued
    try {
        const reserveDonation = await Donation.findByIdAndUpdate(idDonation, { demandant: idUserLogued, demandantMessage: demandantMessage })
        let a = await Donation.findById(idDonation)
        console.log(a)
        res.status(200).json('Informacion reservada correctamente')
    } catch (error) {
        res.status(500).json('error:' + error)
    }
}


async function deReserveDonation(req, res) {
    const idDonation = req.params.idDonation
    const idUserLogued = req.idUserLogued
    const rolUserLogued = req.rolUserLogued

    try {
        const foundDonation = await Donation.findById(idDonation)
        if (foundDonation.demandant == idUserLogued || rolUserLogued == 'admin') { // Usar == no ===
            const reserveDonation = await Donation.findByIdAndUpdate(idDonation, { demandant: null, demandantMessage: '' })
            res.status(200).json('Información de-reservada correctamente')
        } else {
            res.status(400).json('A reserva no te pertence')
        }

    } catch (error) {
        res.status(500).json('error:' + error)
    }
}




module.exports = { getDonations, getDonation, getDonationsByCreator, getDonationFiltered, saveDonation, updateDonation, deleteDonation, reserveDonation, deReserveDonation }