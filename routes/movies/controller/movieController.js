const Movie = require('../model/Movie')
const User = require('../../users/model/User')

async function getAllFavoriteMovies(req, res){
    try{

        let decodedToken = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedToken.email})

        let movies = await Movie.find({})

        let filteredMovies = movies.filter(movie => movie.userID.toString() === foundUser._id.toString())

        res.json({
            message: "success",
            payload: filteredMovies
        })
    }catch(e){
        res.status(500).json({
            message: "Error",
            error: e.message
        })
    }
}

async function addToFavorite(req, res){
    try{
        let { title, poster, imdbLink, imdbId, userID} = req.body

        let decodedToken = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedToken.email})

        console.log(foundUser)

        const createdMovie = new Movie({
            title,
            poster,
            imdbLink,
            imdbId,
            userID
        })

        let savedMovie = await createdMovie.save()

        foundUser.favoriteMovies.push(savedMovie._id)

        await foundUser.save()

        res.json({
            message : 'success',
            payload : savedMovie
        })

    }catch(e){
        res.status(500).json({
            message: "Error",
            error: e.message
        })
    }
}

async function deleteFavorite(req, res){
    try{
        const deleteMovie = await Movie.find({imdbId : req.params.imdbId})
        const decodedToken = res.locals.decodedData

        console.log(deleteMovie[0])

        const deletedMovie = await Movie.findByIdAndDelete(deleteMovie[0]._id)

        let foundUser = await User.findOne({email : decodedToken.email})

        let filteredFavorites = foundUser.favoriteMovies.filter(
            item => item._id.toString() !== deletedMovie._id.toString()
        )

        foundUser.favoriteMovies = filteredFavorites
        await foundUser.save()

        res.json({
            message: "success",
            payload : deletedMovie
        })

    }catch(e){
        res.status(500).json({
            message: "error",
            error: e.message
        })
    }
}

module.exports = {
    addToFavorite,
    getAllFavoriteMovies,
    deleteFavorite
}