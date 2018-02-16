const db = require('../db/config')

const User = {}

User.findAll = () => {
  return db.query(`SELECT * FROM users`)
}

User.findByUserName = userName => {
  return db.oneOrNone(
   `SELECT * FROm users
    WHERE username = $1`,
    [userName])
}

User.create = user => {
  return db.one(
   `INSERT INTO users
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [user.username, user.email, user.password_digest])
}

User.update = (user, id) => {
  return db.one(
    `UPDATE users SET
    block = NOT block
    WHERE id = $2
    RETURNING *`,
    [user.block, id])
}


User.destroy = (id) => {
  return db.none(
    `DELETE FROM users
    WHERE id = $1`,
    [id])
}

module.exports = User
