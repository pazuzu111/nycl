//log query in terminal
const options = {
  query: (e) => {
    console.log(e.query)
  }
}

//interface for psql allowing powerful query-formatting...etc
const pgp = require('pg-promise')(options)

function setDatabase() {
  if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV)
  {
    return pgp({
      database: 'cruise_dev',
      port: 5432,
      host: 'localhost',
    })
  }
  else if(process.env.NODE_ENV === 'production')
  {
    return pgp
    (process.env.DATABASE_URL)
  }
}

const db = setDatabase()

//export db for use in other files
module.exports = db
