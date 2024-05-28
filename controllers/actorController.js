const Actor = require('../models/actor')

const getActors = async (req, res) => {
    try {
        const actors = await Actor.find()
        return res.status(200).json({ actors })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getActorById = async (req, res) => {
    try {
        const { id } = req.params
        const actor = await Actor.findById(id)
        if (actor) {
            return res.status(200).json({ actor })
        }
        return res.status(404).send('Actor with the specified ID does not exist')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createActor = async (req, res) => {
    try {
        const actor = await new Actor(req.body)
        await actor.save()
        return res.status(201).json({ actor })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getActors,
    getActorById,
    createActor,
}