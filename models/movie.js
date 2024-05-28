const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        genre: { type: String, required: true },
        year: { type: Number, required: true },
        description: { type: String, required: true },
        actors: [{ type: Schema.Types.ObjectId, ref: 'actor' }],
        reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('movie', Movie)