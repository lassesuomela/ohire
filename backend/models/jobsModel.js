const db = require('../configs/db');

const jobs = {
    add: (data, cb) =>{
        return db.query('INSERT INTO jobListings (title, description, users_id) VALUES (?, ?, ?)', [data.title, data.description, data.users_id], cb)
    },
    getCount: (cb) => {
        return db.query('SELECT password FROM users WHERE username = ? LIMIT 1', cb);
    },
    deleteById: (users_id, id, cb) => {
        return db.query('DELETE FROM jobListings WHERE users_id = ? AND id = ?', [users_id, id], cb);
    }
}

module.exports = jobs;