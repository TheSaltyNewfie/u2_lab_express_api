const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const actorController = require('./controllers/actorController')
const movieController = require('./controllers/movieController')
const reviewController = require('./controllers/reviewController')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running!')
})

app.get('/actors', actorController.getActors)
app.get('/actors/:id', actorController.getActorById)
app.get('/movies', movieController.getMovies)
app.get('/movies/:id', movieController.getMovieById)
app.get('/movies/actor/:actorId', movieController.getMoviesByActor)
app.get('/reviews', reviewController.getReviews)
app.get('/reviews/:id', reviewController.getReviewById)
app.get('/reviews/movie/:movieId', reviewController.getReviewByMovieId)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})