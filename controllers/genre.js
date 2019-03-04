const Genre = require('../models/Genre')
const Film = require('../models/Film')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const genres = await Genre.find({user: req.user.id})
        res.status(200).json(genres)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const genre = await Genre.findById(req.params.id)
        res.status(200).json(genre)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Genre.remove({_id: req.params.id})
        await Film.remove({genre: req.params.id})
        res.status(200).json({
            message: 'Выбранный жанр удалён.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const isGenre = await Genre.findOne({name: req.body.name, user: req.user.id})

    if (isGenre) {
        res.status(409).json({
            message: `Жанр "${req.body.name}" уже существует. Вы можете выбрать его из списка.`
        })
    } else {
        const genre = new Genre({
            name: req.body.name,
            user: req.user.id
        })

        try {
            await genre.save()
            res.status(201).json(genre)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.update = async function (req, res) {
    const isGenre = await Genre.findOne({name: req.body.name, user: req.user.id})

    if (isGenre) {
        res.status(409).json({
            message: `Жанр с названием "${req.body.name}" уже существует. Придумайте другое название.`
        })
    } else {
        const updated = {
            name: req.body.name
        }
        try {
            const genre = await Genre.findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
            )
            res.status(200).json(genre)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}