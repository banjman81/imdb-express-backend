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
        let { title, poster, imdbLink, userID} = req.body

        // if(!userID){
        //     const createdMovie = new Movie({
        //         title,
        //         poster,
        //         imdbLink,
        //         userID : "test"
        //     })
    
        //     let savedMovie = await createdMovie.save()
    
        //     foundUser.favoriteMovies.push(savedMovie._id)
    
        //     await foundUser.save()
    
        //     res.json({
        //         message : 'success',
        //         payload : savedMovie
        //     })
        // }else{
            
        // }

        let decodedToken = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedToken.email})

        console.log(foundUser)

        const createdMovie = new Movie({
            title,
            poster,
            imdbLink,
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

module.exports = {
    addToFavorite,
    getAllFavoriteMovies
}