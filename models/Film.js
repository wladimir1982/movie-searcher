const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filmSchema = new Schema({
    genre: {
        ref: 'genres',
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('films', filmSchema)