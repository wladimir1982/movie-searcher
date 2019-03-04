const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/film')
const router = express.Router()


router.get('/:genreId',  passport.authenticate('jwt', {session: false}), controller.getByFilmId)
router.post('/',  passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.patch('/:id',  passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
router.delete('/:id',  passport.authenticate('jwt', {session: false}), controller.remove)

module.exports = router