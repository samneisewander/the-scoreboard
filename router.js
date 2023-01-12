const path = require('path')
const router = require('express').Router()
const passport = require('passport')
const genPassword = require('./lib/passwordUtils').genPassword
const protect = require('./lib/protect').protect
const connection = require('./lib/database')
const User = connection.models.User

//GET Routes (unprotected)
router.get('/login', (req, res) => {
    let err = req.flash().error
    try {
        if (err) res.redirect('/login?err=' + err[0])
        else res.sendFile(path.join(__dirname, './pages/login.html'))
    }
    catch (err) { res.sendFile(path.join(__dirname, './pages/login.html')) }
})

//GET Routes (protected)
router.get('/', protect, (req, res) => {
    res.sendFile(path.join(__dirname, './pages/scoreboard.html'))
})

module.exports = router