const db = require('../configs/db');

const user = {
    addUser: (user, cb) =>{
        return db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email], cb)
    },
    getPasswordByUsername: (username, cb) => {
        return db.query('SELECT password FROM users WHERE username = ? LIMIT 1', [username], cb);
    },
    getByUsername: (username, cb) => {
        return db.query('SELECT id, username, role FROM users WHERE username = ? LIMIT 1', [username], cb);
    }
}

module.exports = user;