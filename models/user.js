const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imageUrl: { type: String, required: false },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)