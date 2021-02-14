let User = require('../model/userSchema')
let ThirdSector = require('../model/thirdSector')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
const request = require('request');
const fetch = require('node-fetch');

dotenv.config();

const transport = nodeMailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.MAIL_DONATELLO,
        pass: process.env.PASSWORD_MAIL_DONATELLO,
    },
    secure: true,
})

async function getIsTercerSector(req, res) {
    const emailUser = req.params.email
    try{
        const find = await ThirdSector.findOne({"ENT EMAIL": emailUser}).exec()
        const ret = {
            'ent':find['NUM ENT'],
            'name':find['ENT NOME'],
            'address':find['ENT DIRECCION'],
        };

        if(find) res.status(200).json(ret)
        else res.status(401).json(false)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

/*async function getTercer(req, res) {
   
    try{
        const tercer = await ThirdSector.find({}).exec()
        res.status(200).json(tercer)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}*/

async function getUsers(req, res) {
    if(req.rolUserLogued!=='admin'){
        res.status(401).json('No tes permisos')
    }
    try{
        const users = await User.find({}).exec()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function getUser(req, res) {
    if(req.rolUserLogued!=='admin'){
        res.status(401).json('No tes permisos')
    }
    const userId = req.params.id
    try{
        const userFound = await User.findById(userId)
        res.status(200).json(userFound)
    }catch(error){
        res.status(500).json('error:'+error)
    }
}


async function saveUser(req, res){
    /*if(req.rolUserLogued!=='admin'){
        res.status(401).json('No tienes permisos')
    }*/
    const userBody = req.body
    const userId = req.params.id
    const user = new User(userBody)
console.log('upda')
    try{ //Busco para comprobar si pertenece al 3er sector
        const find = await ThirdSector.findOne({"ENT EMAIL": userId}).exec()
        if(find) userBody = '3sector';
        else userBody.rol = 'public';

        

        // Comprobar si ya existe un usuario con ese email en la BD
        let userFound = await User.findOne({email:userBody.email})
        if(userFound) return res.status(400).json('Error: Usuario repetido')
    }catch(error){
        res.status(500).json('error:'+error)
    }

    try { // Send email
        sendMail(userBody.email, process.env.ASUNTO_REGISTRO, process.env.TEXTO_REGISTRO);
    } catch (error) {
        res.status(500).json('error:'+error)
    }

    //const salt = await bcrypt.genSalt(10)
    //const hashPassword = await bcrypt.hash(userBody.password, salt)

    // Foto rondom
    //https://aws.random.cat/meow
    try { // Foto random
        if(!user.imageUrl || user.imageUrl==''){
            const response = await fetch('https://aws.random.cat/meow')
            const j = await response.json()
            user.imageUrl = j.file;
        }
    } catch (error) {
        user.imageUrl='https://geografia.departamentos.uva.es/wp-content/uploads/2017/06/sin-foto-mujer.jpg'
    }

    try{ // Guadar el nuevo usuario en la BD
       // user.password = hashPassword
        const userSave = await user.save()
        res.status(200).json('Informacion gardada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }

}

async function updateUser(req, res){
    if(req.rolUserLogued!=='admin'){
        res.status(401).json('No tes permisos')
    }

    const userId = req.params.id
    const userBody = req.body
    try{
        userBody.password=undefined
        const userUpdated = await User.findByIdAndUpdate(userId, userBody)
        res.status(200).json('Informacion actualizada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function deleteUser(req, res){
    if(req.rolUserLogued!=='admin'){
        res.status(401).json('No tes permisos')
    }
    
    const userId = req.params.id
    try{
        const userDeleted = await User.findByIdAndRemove(userId)
        res.status(200).json('Informacion borrada correctamente')
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

async function login(req, res) {
    const userBody = req.body // email, password
    try{ // comprobar si el usuario existe
        let userFound = await User.findOne({email:userBody.email})
        if(!userFound) return res.status(400).json('Error usuario/password incorrecto 1')

        // comprobamos si el password coincide
        const validPassword = await bcrypt.compare(userBody.password, userFound.password)
        if(!validPassword) return res.status(400).json('Error usuario/password incorrecto 2')
    
        const token = jwt.sign(
            {
                sub: userFound._id,
                name: userFound.nombre,
                email: userFound.email,
                rol: userFound.rol,
                exp: Math.floor( Date.now()/1000 + (60*60*60) ), // El token se puedo usar duante 1 hora
                iat: Date.now()
            },
            process.env.TOKEN_SECRETO
        )
        res.header('auth-token', token)
        let user = {_id:userFound.id, name:userFound.name, email:userFound.email, rol:userFound.rol}
        res.status(200).json({authToken:token, user})
    }catch(error){
        res.status(500).json('error:'+error)
    }
}

const sendMail = (user, subject, text) => {
    const mailData = {
        from: 'samuxyt@gmail.com',
        to: user,   
        subject: subject,
        html: text
    };

    transport.sendMail(mailData, (err, info) => {
        if (err) return console.log(err);
        console.log("mail sent")
    });  
}

module.exports = { getUsers, getUser, saveUser, updateUser, deleteUser, login, getIsTercerSector}