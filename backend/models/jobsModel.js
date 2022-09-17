const db = require('../configs/db');

const jobs = {
    add: (data, cb) =>{
        return db.query('INSERT INTO joblistings (title, description, users_id, salary, workingTime) VALUES (?, ?, ?, ?, ?)', [data.title, data.description, data.users_id, data.salary, data.workingTime], cb)
    },
    getCount: (filter, cb) => {
        return db.query("SELECT COUNT(id) AS maxCount FROM joblistings WHERE joblistings.title LIKE CONCAT('%', ?, '%')", [filter], cb);
    },
    getById: (id, cb) => {
        return db.query('SELECT * from joblistings WHERE id = ? LIMIT 1', [id], cb);
    },
    getNAmountOfPostings: (filter, n, cb) =>{
        return db.query("SELECT joblistings.id, joblistings.timestamp, joblistings.description, joblistings.title, joblistings.salary, joblistings.workingTime, users.company FROM joblistings JOIN users ON joblistings.users_id = users.id WHERE joblistings.title LIKE CONCAT('%', ?, '%') ORDER BY id DESC LIMIT ?, 10", [filter, n], cb);
    },
    deleteById: (users_id, id, cb) => {
        return db.query('DELETE FROM joblistings WHERE users_id = ? AND id = ?', [users_id, id], cb);
    },
    getCompanysPostingCount: (id, cb) => {
        return db.query("SELECT COUNT(id) AS maxCount FROM joblistings WHERE users_id = ?", [id], cb);
    },
    getNAmountOfCompanyPostings: (id, n, cb) =>{
        return db.query("SELECT joblistings.id, joblistings.timestamp, joblistings.description, joblistings.title, joblistings.salary, joblistings.users_id, joblistings.workingTime, COUNT(applications.id) as 'applicationCount' FROM joblistings LEFT JOIN applications ON applications.joblistings_id = joblistings.id WHERE joblistings.users_id = ? GROUP BY joblistings.id ORDER BY id DESC LIMIT ?, 10", [id, n], cb);
    },
}

module.exports = jobs;