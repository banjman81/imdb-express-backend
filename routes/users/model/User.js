const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type : String
        },
        lastName : {
            type : String
        },
        username: {
            type : String,
            unique: true
        },
        email: {
            type : String,
            unique : true
        },
        password: {
            type : String
        },
        favoriteMovies : [{type: mongoose.Schema.ObjectId, ref : "movie"}]
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('user', UserSchema)