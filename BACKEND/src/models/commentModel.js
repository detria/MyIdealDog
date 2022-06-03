const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    topic: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    },
    {collection:'Comment'}
    )

module.exports = model('Comment', commentSchema)