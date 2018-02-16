const express = require('express')//express
const authRouter = express.Router()//specify router
const passport = require('../services/auth/local')//use to compare user passwords
const usersController = require('../controllers/users-controller')//use methods
const User = require('../models/User')//to use methods in this file

//when requested activate create controller
authRouter.post('/register', usersController.create)

//when requested use passport to compare user info with info in db
authRouter.post('/login', passport.authenticate('local', {

  //if success or failure, send to verify
  successRedirect: '/api/auth/verify',
  failureRedirect: '/api/auth/verify',
  failureFlash: true
}))

//verify user
authRouter.get('/verify', (req, res) => {
  console.log('hello',req.user.username)

  //if the client is a admin
  if(req.user.username === 'admin')
  {
    //return json response to client
     return res.status(200).json({
      message: 'admin logged in!',
      auth: false,
      authAdmin: true,
      data: {
        user: req.user
      }
    })

  }
  //if not admin
  else if(req.user.username !== 'admin' )
  {

    //use user model method to find user
    User.findByUserName(req.user.username)
        .then(user => {

            //if block is false
            if (user.block === false)
            {
                //send json response to client
                return res.status(200).json({
                        message: 'user logged in!',
                        auth: true,
                        blockUser: false,
                        authAdmin: false,
                        data: {
                            user: req.user
                        }
                       })
            }
            else
            {
                return res.status(400).json({
                        message: 'failed',
                        auth: false,
                        blockUser: true,
                        authAdmin: false,
                        data: {
                            user: req.user
                        }
                       })
            }
        })

  }
  else
  {
    //alert login failure
    return res.status(400).json({
      message: 'Login failed',
      auth: false,
      authAdmin: false,
      data: {
        user: null
      }
    })
  }
})

//when requested call logout and send response to client
authRouter.get('/logout', (req, res) => {
  req.logout()
  res.json({
    message: 'logged out',
    auth: false,
    data: {
      user: null
    }
  })
})

//export auth router
module.exports = authRouter
