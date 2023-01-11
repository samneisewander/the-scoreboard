const path = require('path')
const router = require('express').Router()
const passport = require('passport')
const genPassword = require('../lib/passwordUtils').genPassword
const protect = require('../lib/protect').protect
const connection = require('../config/database')
const User = connection.models.User

//GET Routes (unprotected)


module.exports = router