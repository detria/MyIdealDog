const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    },
    {collection:'User'}
    )

module.exports = model('User', UserSchema)