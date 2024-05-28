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
            year: 2008,
            description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
            actors: [actors.find(a => a.name === "Robert Downey Jr.")._id]
        },
        {
            name: "Avengers: Endgame",
            rating: 8.4,
            genre: "Action",
            year: 2019,
            description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            actors: [actors.find(a => a.name === "Robert Downey Jr.")._id, actors.find(a => a.name === "Scarlett Johansson")._id, actors.find(a => a.name === "Chris Hemsworth")._id]
        },
        {
            name: "Wonder Woman",
            rating: 7.4,
            genre: "Action",
            year: 2017,
            description: "When a pilot crashes and tells of conflict in the outside world, Diana, an Amazonian warrior in training, leaves home to fight a war, discovering her full powers and true destiny.",
            actors: [actors.find(a => a.name === "Gal Gadot")._id]
        },
        {
            name: "Forrest Gump",
            rating: 8.8,
            genre: "Drama",
            year: 1994,
            description: "a childlike man who unknowingly takes part in some of the most significant moments in modern American history, sometimes becoming an accidental hero",
            actors: [actors.find(a => a.name === "Tom Hanks")._id]
        },
        {
            name: "La La Land",
            rating: 8.0,
            genre: "Drama",
            year: 2016,
            description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
            actors: [actors.find(a => a.name === "Emma Stone")._id]
        },
        {
            name: "Inception",
            rating: 8.8,
            genre: "Sci-Fi",
            year: 2010,
            description: "A thief who enters the dreams of others to steal secrets from their subconscious.",
            actors: [actors.find(a => a.name === "Leonardo DiCaprio")._id]
        },
        {
            name: "The Hunger Games",
            rating: 7.2,
            genre: "Action",
            year: 2012,
            description: "Katniss Everdene voluntarily takes her younger sister's place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death.",
            actors: [actors.find(a => a.name === "Jennifer Lawrence")._id]
        },
        {
            name: "Training Day",
            rating: 7.7,
            genre: "Crime",
            year: 2001,
            description: "On his first day on the job as a Los Angeles narcotics officer, a rookie cop goes beyond a full work day in training within the narcotics division of the LAPD with a rogue detective who isn't what he appears to be.",
            actors: [actors.find(a => a.name === "Denzel Washington")._id]
        },
        {
            name: "The Shawshank Redemption",
            rating: 9.3,
            genre: "Drama",
            year: 1994,
            description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
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