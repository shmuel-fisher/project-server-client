const mySql = require('mysql2/promise');

const pool = mySql.createPool({
    host: "localhost",
    user: "root",
    database: "sqldata",
    password: "s12345677"
})


module.exports = {
    pool,
};



