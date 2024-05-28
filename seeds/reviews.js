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
        {
            title: "Disappointing",
            movie: movies.find(m => m.name === "Wonder Woman")._id,
            reviewer: "Bob Johnson",
            text: "I had high expectations for this movie, but it fell short. The plot was weak and the characters were uninteresting.",
            rating: 4,
        },
        {
            title: "Incredible!",
            movie: movies.find(m => m.name === "The Shawshank Redemption")._id,
            reviewer: "Sarah Johnson",
            text: "This movie is an absolute masterpiece. The storytelling and performances are outstanding.",
            rating: 10,
        },
        {
            title: "A Must-Watch",
            movie: movies.find(m => m.name === "The Hunger Games")._id,
            reviewer: "Michael Thompson",
            text: "This movie is a thrilling ride from start to finish. I couldn't look away!",
            rating: 9,
        }
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