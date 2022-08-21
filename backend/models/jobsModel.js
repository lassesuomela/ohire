const db = require('../configs/db');

const jobs = {
    add: (data, cb) =>{
        return db.query('INSERT INTO jobListings (title, description, users_id, salary, workingTime) VALUES (?, ?, ?, ?, ?)', [data.title, data.description, data.users_id, data.salary, data.workingTime], cb)
    },
    getCount: (filter, cb) => {
        return db.query("SELECT COUNT(id) AS maxCount FROM jobListings WHERE jobListings.title LIKE CONCAT('%', ?, '%')", [filter], cb);
    },
    getById: (id, cb) => {
        return db.query('SELECT * from jobListings WHERE id = ? LIMIT 1', [id], cb);
    },
    getNAmountOfPostings: (filter, n, cb) =>{
        return db.query("SELECT jobListings.id, jobListings.timestamp, jobListings.description, jobListings.title, jobListings.salary, jobListings.workingTime, users.company FROM jobListings JOIN users ON jobListings.users_id = users.id WHERE jobListings.title LIKE CONCAT('%', ?, '%') ORDER BY id DESC LIMIT ?, 10", [filter, n], cb);
    },
    deleteById: (users_id, id, cb) => {
        return db.query('DELETE FROM jobListings WHERE users_id = ? AND id = ?', [users_id, id], cb);
    }
}

module.exports = jobs;