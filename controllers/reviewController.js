const Review = require('../models/review')

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        return res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params
        const review = await Review.findById(id)
        if (review) {
            return res.status(200).json({ review })
        }
        return res.status(404).send('Review with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getReviewByMovieId = async (req, res) => {
    try {
        const { movieId } = req.params
        const reviews = await Review.find({ movie: movieId })
        if (reviews) {
            return res.status(200).json({ reviews })
        }
        return res.status(404).send('Reviews with the specified movie ID do not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createReview = async (req, res) => {
    try {
        const review = await new Review(req.body)
        await review.save()
        return res.status(201).json({ review })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getReviews,
    getReviewById,
    getReviewByMovieId,
    createReview,
}