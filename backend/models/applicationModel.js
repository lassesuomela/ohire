const db = require('../configs/db');

const applications = {
    add: (data, cb) =>{
        return db.query('INSERT INTO applications (application, users_id, joblistings_id, cvFile, applicationFile) VALUES (?, ?, ?, ?, ?)', [data.application, data.users_id, data.joblistings_id, data.cvFile, data.applicationFile], cb)
    },
    getByUsersId: (id, cb) => {
        return db.query("SELECT applications.id as 'applicationId', applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId' FROM applications JOIN joblistings on joblistings.id = applications.joblistings_id WHERE applications.users_id = ?", [id], cb);
    },
    getByJobId: (id, users_id, cb) => {
        return db.query("SELECT users.username, applications.id as 'applicationId', applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId' FROM applications JOIN joblistings on joblistings.id = applications.joblistings_id JOIN users on users.id = applications.users_id WHERE applications.joblistings_id = ? AND jobListings.users_id = ?", [id, users_id], cb);
    },
    getByApplicationId: (id, job_id, cb) => {
        return db.query("SELECT users.username, applications.timestamp, applications.application, applications.cvFile, applications.applicationFile, applications.rating, applications.users_id, applications.joblistings_id, joblistings.title FROM applications JOIN users on users.id = applications.users_id JOIN joblistings on joblistings.id = applications.joblistings_id WHERE applications.id = ? AND applications.joblistings_id = ?", [id, job_id], cb);
    },
}

module.exports = applications;