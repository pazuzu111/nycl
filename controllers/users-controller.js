const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

const usersController = {}

usersController.index = (req, res, next) => {
  User.findAll()
  .then(users => {
    res.json({
      message: 'ok',
      auth: false,
      authAdmin: true,
      data: {users}
    })
  }).catch(next)
}

usersController.create = (req, res, next) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(req.body.password, salt)

  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash
  })
  .then(user => {
    req.login(user, (err) => {
      if (err) return next(err)
      res.status(201).json({
        message: 'user successfully created',
        auth: true,
        data: {
          user
        }
      })
    })
  }).catch(next)
}

usersController.update = (req, res, next) => {
  User.update({
    block: req.body.block
  }, req.params.id)
  .then(user => {
    res.json({
      message: `user blocked: ${user.block}`,
      data: { user }
    })
    console.log('after update:',user.block)
  }).catch(next)
}

usersController.delete = (req, res, next) => {
  User.destroy(req.params.id)
  .then(() => {
    res.json({
      message: 'user deleted!'
    })
  }).catch(next)
}
module.exports = usersController
