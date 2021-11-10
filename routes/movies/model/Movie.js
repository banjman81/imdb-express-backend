const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
    {
        title: {
            type : String
        },
        poster: {
            type : String
        },
        imdbLink: {
            type : String
        }, 
        imdbId:{
            type : String
        },
        userID : {
            type  : mongoose.Schema.ObjectId,
            ref: "user"
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("movie", MovieSchema)