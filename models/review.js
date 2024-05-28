const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Review = new Schema(
    {
        title: { type: String, required: true },
        movie: { type: Schema.Types.ObjectId, ref: 'movie' },
        reviewer: { type: String, required: true},
        text: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('review', Review)