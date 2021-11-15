const express = require('express')
const { addToFavorite, getAllFavoriteMovies, deleteFavorite } = require('./controller/movieController')
const router = express.Router()

const {jwtMiddleware} = require('../users/lib/sharedAuthentication/jwtMiddleware')


router.post('/add-favorite',jwtMiddleware, addToFavorite)
router.get('/all-favorites', jwtMiddleware,  getAllFavoriteMovies)
router.delete('/delete-favorite/:imdbId', jwtMiddleware, deleteFavorite)

module.exports = router