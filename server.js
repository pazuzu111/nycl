// const express = require('express')
// const logger = require('morgan')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
// const passport = require('passport')
// const app = express()

// require('dotenv').config()

// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())
// app.use(
//   session({
//     key: 'itsasecretshhh',
//     secret: 'itsasecretshhh',
//     resave: false,
//     saveUninitialized: true
//   })
// )
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(express.static('public'))
// const PORT = process.env.PORT || 3004

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`)
// })

// app.get('/', (req, res) => {
//   res.send('go to /api/users to see users object')
// })

// // const authRoutes = require('./routes/auth-routes')
// // app.use('/api/auth', authRoutes)

// // const userRoutes = require('./routes/user-routes')
// // app.use('/api/users', userRoutes)

// app.use('*', (req, res) => {
//   res.status(400).json({
//     message: 'Not found!'
//   })
// })

// app.use((err, req, res, next) => {
//   console.log(err)
//   res.status(500).json({
//     error: err,
//     message: err.message
//   })
// })
