const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    nombre: String,
    apellidos: String,
    edad: Number,
    email: String,
    estado: String
})

module.exports = model('users', userSchema)