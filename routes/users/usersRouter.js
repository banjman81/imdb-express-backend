const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const {checkIsEmpty, checkIsUndefined, validateCreateData, validateLoginData, jwtMiddleware, profileUpdate} = require('./lib/index')
const { createUser, login, updateUser } = require('./controller/userController')

router.post('/create-user', checkIsUndefined, checkIsEmpty, validateCreateData, createUser)
router.post('/login', checkIsUndefined, checkIsEmpty, validateLoginData, login )
router.put('/update-user', jwtMiddleware, profileUpdate, updateUser)

module.exports = router