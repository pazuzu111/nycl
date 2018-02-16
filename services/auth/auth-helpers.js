const bcrypt = require('bcryptjs')//password hasher

//compare helper
function comparePass (userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}

//export helper function
module.exports = {
  comparePass: comparePass
}
