const db = require('../configs/db');

const user = {
    addUser: (user, cb) =>{
        return db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email], cb)
    }
}

module.exports = user;