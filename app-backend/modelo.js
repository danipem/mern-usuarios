const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TO DO: validaciones de campos en BBDD. ¡OBLIGATORIO!
let Usuario = new Schema({
    nombre:{
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    edad: {
        type: Number
    }
})
// Como el export default pero para Node
module.exports = mongoose.model('Usuario', Usuario)