const db = require('../db')
const Movie = require('../models/movie')
const Actor = require('../models/actor')
const Review = require('../models/review')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const actors = await Actor.find()

    const movies = [
        {
            name: "Iron Man",
            rating: 7.9,
            genre: "Action",
            actors: [actors.find(a => a.name === "Robert Downey Jr.")._id]
        },
        {
            name: "Avengers: Endgame",
            rating: 8.4,
            genre: "Action",
            actors: [actors.find(a => a.name === "Robert Downey Jr.")._id, actors.find(a => a.name === "Scarlett Johansson")._id, actors.find(a => a.name === "Chris Hemsworth")._id]
        },
        {
            name: "Wonder Woman",
            rating: 7.4,
            genre: "Action",
            actors: [actors.find(a => a.name === "Gal Gadot")._id]
        },
        {
            name: "Forrest Gump",
            rating: 8.8,
            genre: "Drama",
            actors: [actors.find(a => a.name === "Tom Hanks")._id]
        },
        {
            name: "La La Land",
            rating: 8.0,
            genre: "Drama",
            actors: [actors.find(a => a.name === "Emma Stone")._id]
        },
        {
            name: "Inception",
            rating: 8.8,
            genre: "Sci-Fi",
            actors: [actors.find(a => a.name === "Leonardo DiCaprio")._id]
        },
        {
            name: "The Hunger Games",
            rating: 7.2,
            genre: "Action",
            actors: [actors.find(a => a.name === "Jennifer Lawrence")._id]
        },
        {
            name: "Training Day",
            rating: 7.7,
            genre: "Crime",
            actors: [actors.find(a => a.name === "Denzel Washington")._id]
        },
        {
            name: "The Shawshank Redemption",
            rating: 9.3,
            genre: "Drama",
            actors: [actors.find(a => a.name === "Morgan Freeman")._id]
        }
    ]

    const newMovies = await Movie.insertMany(movies)
    console.log('Movies added!')

    for (const movie of newMovies) {
        await Actor.updateMany(
            { _id: { $in: movie.actors } },
            { $push: { movies: movie._id } }
        )
    }
}

const run = async () => {
    await main()
    db.close()
}

run()