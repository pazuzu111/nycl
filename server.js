const express = require('express')//express
const logger = require('morgan')//method logger
const bodyParser = require('body-parser')//parse request body
const cookieParser = require('cookie-parser')//used for express session to read & write cookies
const session = require('express-session')//user sessions
const passport = require('passport')//authentication
const app = express()//express instance

require('dotenv').config()//should be used for SECRETKEY

//module initializers
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    key: 'itsasecretshhh',
    secret: 'itsasecretshhh',
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))//tell express to look in public for static files

//state port #
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//when request hits index route send message
app.get('/', (req, res) => {
  res.send('go to /api/users to see users object')
})

//pull routes from routes file
const authRoutes = require('./routes/auth-routes')
app.use('/api/auth', authRoutes)

const userRoutes = require('./routes/user-routes')
app.use('/api/users', userRoutes)

//use a 400 status on all routes
app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Not found!'
  })
})

//use a 500 status on all routes
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    error: err,
    message: err.message
  })
})
