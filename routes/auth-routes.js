// const express = require('express')
// const authRouter = express.Router()
// const passport = require('../services/auth/local')

// const usersController = require('../controllers/users-controller')
// const User = require('../models/User')

// authRouter.post('/register', usersController.create)

// authRouter.post('/login', passport.authenticate('local', {
//   successRedirect: '/api/auth/verify',
//   failureRedirect: '/api/auth/verify',
//   failureFlash: true
// }))

// authRouter.get('/verify', (req, res) => {
//   console.log('hello',req.user.username)

//   if(req.user.username === 'admin')
//   {
//      return res.status(200).json({
//       message: 'admin logged in!',
//       auth: false,
//       authAdmin: true,
//       data: {
//         user: req.user
//       }
//     })

//   }
//   else if(req.user.username !== 'admin' )
//   {

//     User.findByUserName(req.user.username)
//         .then(user => {
//             if (user.block === false)
//             {
//                 return res.status(200).json({
//                         message: 'user logged in!',
//                         auth: true,
//                         blockUser: false,
//                         authAdmin: false,
//                         data: {
//                             user: req.user
//                         }
//                        })
//             }
//             else
//             {
//                 return res.status(400).json({
//                         message: 'failed',
//                         auth: false,
//                         blockUser: true,
//                         authAdmin: false,
//                         data: {
//                             user: req.user
//                         }
//                        })
//             }
//         })

//   }
//   else
//   {
//     return res.status(400).json({
//       message: 'Login failed',
//       auth: false,
//       authAdmin: false,
//       data: {
//         user: null
//       }
//     })
//   }
// })

// authRouter.get('/logout', (req, res) => {
//   req.logout()
//   res.json({
//     message: 'logged out',
//     auth: false,
//     data: {
//       user: null
//     }
//   })
// })

// module.exports = authRouter
