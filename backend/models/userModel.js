const db = require('../configs/db');

const user = {
    addUser: (user, cb) =>{
        return db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [user.username, user.password, user.email], cb)
    },
    addCompanyUser: (user, cb) =>{
        return db.query('INSERT INTO users (username, password, email, role, company) VALUES (?, ?, ?, 2, ?)', [user.username, user.password, user.email, user.company], cb)
    },
    getPasswordByUsername: (username, cb) => {
        return db.query('SELECT password FROM users WHERE username = ? LIMIT 1', [username], cb);
    },
    getByUsername: (username, cb) => {
        return db.query('SELECT id, username, role FROM users WHERE username = ? LIMIT 1', [username], cb);
    },
    getProfileDataByUsername: (username, cb) => {
        return db.query('SELECT role, username, email, company, uuid, createdAt FROM users WHERE username = ? LIMIT 1', [username], cb);
    }
}

module.exports = user;