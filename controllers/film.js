const Film = require('../models/Film')
const errorHandler = require('../utils/errorHandler')


module.exports.getByFilmId = async function (req, res) {
    try {
        const films = await Film.find({
            genre: req.params.genreId,
            user: req.user.id
        })
        res.status(200).json(films)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const film = new Film({
        genre: req.body.genre,
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        imageSrc: req.file ? req.file.path : '',
        user: req.user.id
    })
    try {
        await film.save()
        res.status(201).json(film)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Film.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Фильм был удалён.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        genre: req.body.genre,
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        user: req.user.id
    }

    if (req.file) {
        updated.imageSrc = req.file.path
    }
    try {
        const film = await Film.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(film)
    } catch (e) {
        errorHandler(res, e)
    }
}