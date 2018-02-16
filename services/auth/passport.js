const passport = require('passport')
const User = require('../../models/User')

module.exports = () => {

  //save user data to a session
  passport.serializeUser((user, done) => {
    done(null, user.username)
  })

  //user object attaches to the request as req.user
  passport.deserializeUser((username, done) => {
    User.findByUserName(username)
      .then(user => {done(null, user)}).catch(err => {
        done(err, null)
      })
  })
}
