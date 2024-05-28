const Movie = require('../models/movie')

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        return res.status(200).json({ movies })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await Movie.findById(id)
        if (movie) {
            return res.status(200).json({ movie })
        }
        return res.status(404).send('Movie with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getMoviesByActor = async (req, res) => {
    try {
        const { actorId } = req.params
        const movies = await Movie.find({ actors: actorId })
        if (movies) {
            return res.status(200).json({ movies })
        }
        return res.status(404).send('Movies with the specified actor ID do not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = await new Movie(req.body)
        await movie.save()
        return res.status(201).json({ movie })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getMovies,
    getMovieById,
    getMoviesByActor,
    createMovie,
}