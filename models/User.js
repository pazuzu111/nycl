//import database form config.js
const db = require('../db/config')

const User = {}

//findall users by sending query to db
User.findAll = () => {
  return db.query(`SELECT * FROM users`)
}

//find user by user name by sending query to db
User.findByUserName = userName => {
  return db.oneOrNone(
   `SELECT * FROm users
    WHERE username = $1`,
    [userName])
}

//create user by sending query to db
User.create = user => {
  return db.one(
   `INSERT INTO users
    (username, email, password_digest)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [user.username, user.email, user.password_digest])
}

//update user by sending query to db
User.update = (user, id) => {
  return db.one(
    `UPDATE users SET
    block = NOT block
    WHERE id = $2
    RETURNING *`,
    [user.block, id])
}

//destroy user by sending query to db
User.destroy = (id) => {
  return db.none(
    `DELETE FROM users
    WHERE id = $1`,
    [id])
}

//export user model for use in other files
module.exports = User
