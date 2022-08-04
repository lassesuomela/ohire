const db = require('../configs/db');

const jobs = {
    add: (data, cb) =>{
        return db.query('INSERT INTO jobListings (title, description, users_id, salary) VALUES (?, ?, ?, ?)', [data.title, data.description, data.users_id, data.salary], cb)
    },
    getCount: (cb) => {
        return db.query('SELECT COUNT(id) AS maxCount FROM jobListings', cb);
    },
    getNAmountOfPostings: (n, cb) =>{
        return db.query("SELECT * FROM jobListings ORDER BY id DESC LIMIT ?, 10", [n], cb);
    },
    deleteById: (users_id, id, cb) => {
        return db.query('DELETE FROM jobListings WHERE users_id = ? AND id = ?', [users_id, id], cb);
    }
}

module.exports = jobs;