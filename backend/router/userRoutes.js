
const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const UserController = require('../controller/userController')
const DonationController = require('../controller/donationController')
const verifyToken = require('../controller/verifyToken')
var api = express.Router()


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');

api.post('/images/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'La foto ocupa demasiado';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
});

api.get('/isTercerSector/:email',UserController.getIsTercerSector ) // devolver un usuario en particular (id)
//api.get('/tercer',UserController.getTercer ) // devolver un usuario en particular (id)
api.get('/donations', verifyToken.auth,DonationController.getDonationsByCreator ) // devolver un usuario en particular (id)
api.get('/', verifyToken.auth,  UserController.getUsers) // devolver todos los usuarios
api.get('/:id', verifyToken.auth,UserController.getUser ) // devolver un usuario en particular (id)
api.post('/', UserController.saveUser) // insertar usuario nuevo(registro/singup) (los datos los obtengo del body)
api.put('/:id', verifyToken.auth,  UserController.updateUser) // actualizamos un usuario completo (id) (la información nueva me llega por el body)
api.delete('/:id', verifyToken.auth, UserController.deleteUser) // borramos un usuario enparticular (id)
api.post('/login', UserController.login) // Logueamos el usuario (devolvemos el token)

module.exports = api