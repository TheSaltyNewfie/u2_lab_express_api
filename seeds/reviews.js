const { text } = require('body-parser')
const db = require('../db')
const Movie = require('../models/movie')
const Review = require('../models/review')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const movies = await Movie.find()

    const reviews = [
        {
            title: "Great movie!",
            movie: movies.find(m => m.name === "Iron Man")._id,
            reviewer: "John Doe",
            text: "I loved this movie! It was so cool to see!",
            rating: 9,
        },
        {
            title: "Meh",
            movie: movies.find(m => m.name === "Avengers: Endgame")._id,
            reviewer: "Jane Doe",
            text: "It was okay, I guess.",
            rating: 6,
        },
    ]

    const newReviews = await Review.insertMany(reviews)
    console.log('Reviews added!')

    for(const review of newReviews) {
        await Movie.findByIdAndUpdate(review.movie, { $push: { reviews: review._id } })
    }
}

const run = async () => {
    await main()
    db.close()
}

run()