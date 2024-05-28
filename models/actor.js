const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Actor = new Schema(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        born: { type: String, required: true },
        alive: { type: Boolean, required: true, default: true },
        movies: [{ type: Schema.Types.ObjectId, ref: 'movie' }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('actor', Actor)