const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const errorHandler = require('../../util/errorHandler')

async function createUser(req, res){
    const {firstName, lastName, username, email, password} = req.body
    let salt = await bcrypt.genSalt(10)
    let hashed = await bcrypt.hash(password, salt)

    try {
        const createdUser = new User ({
            firstName,
            lastName,
            username,
            email,
            password: hashed
        })

        let savedUser = await createdUser.save()
        res.json({
            message : 'success',
            payload: savedUser
        })
    }catch(e){
        res.status(500).json({
            message : "failed",
            error : errorHandler(e)
        })
    }
}

async function login(req, res){
    const {email, password } = req.body
    try{
        let foundUser = await User.findOne({email: email})
        if(!foundUser){
            res.status(500).json({
                message : "error",
                error: "User not found. Please sign up!"
            })

        }else{
            let comparedPassword = await bcrypt.compare(password, foundUser.password)

            if(!comparedPassword){
                res.status(500).json({
                    message : 'error',
                    error: "Incorrect login information. Please try again"
                })
            }else{
                let jwtToken = jwt.sign (
                    {
                        email : foundUser.email,
                        username : foundUser.username,
                        id : foundUser._id
                    },
                    process.env.JWT_SECRET,
                    {expiresIn : "24h"}
                )

                res.json({
                    message : 'successfully logged in',
                    token : jwtToken
                })
            }
        }
    }catch(e){
        res.status(500).json({
            message: 'error',
            error : errorHandler(e)})
    }
}

module.exports = {
    createUser,
    login
}