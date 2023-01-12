//Modules
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

//Init Application / Set Session Store
const MongoStore = require('connect-mongo')
const app = require('express')()

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/lib', express.static('lib')) // Utilities and Config
app.use('/pages', express.static('pages')) // Frontend
app.use('/assets', express.static('assets')) // Fonts, Images, json, 
app.use(session({
  //https://www.npmjs.com/package/express-session
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: 'SessionLocker',
    autoRemove: 'native'
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
}))
app.use(flash())

//Passport
require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

//Routes
const router = require('./router.js')
app.use(router)

//Listen
app.listen(3000)