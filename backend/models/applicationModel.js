const db = require('../configs/db');

const applications = {
    add: (data, cb) =>{
        return db.query('INSERT INTO applications (application, users_id, joblistings_id, cvFile, applicationFile) VALUES (?, ?, ?, ?, ?)', [data.application, data.users_id, data.joblistings_id, data.cvFile, data.applicationFile], cb);
    },
    getByUsersId: (id, cb) => {
        return db.query("SELECT applications.id as 'applicationId', applications.reviewed, applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId', users.company FROM applications JOIN joblistings on joblistings.id = applications.joblistings_id JOIN users on users.id = joblistings.users_id WHERE applications.users_id = ? ORDER BY applications.timestamp DESC;", [id], cb);
    },
    getByJobId: (id, users_id, cb) => {
        return db.query("SELECT users.username, applications.id as 'applicationId', applications.timestamp, applications.rating, applications.reviewed FROM applications JOIN joblistings on joblistings.id = applications.joblistings_id JOIN users on users.id = applications.users_id WHERE applications.joblistings_id = ? AND jobListings.users_id = ? ORDER BY applications.timestamp DESC LIMIT 10", [id, users_id], cb);
    },
    getByApplicationId: (id, job_id, users_id, cb) => {
        return db.query("SELECT users.username, applications.id, applications.timestamp, applications.application, applications.cvFile, applications.applicationFile, applications.rating, applications.users_id, applications.joblistings_id, joblistings.title FROM applications JOIN users on users.id = applications.users_id JOIN joblistings on joblistings.id = applications.joblistings_id WHERE applications.id = ? AND applications.joblistings_id = ? AND joblistings.users_id = ?", [id, job_id, users_id], cb);
    },
    review: (rating, applicationId, jobId, applicationUsersId, users_id, reviewed, cb) => {
        return db.query("UPDATE applications INNER JOIN joblistings ON joblistings.id = applications.joblistings_id SET applications.rating = ?, applications.reviewed = ? WHERE applications.users_id = ? AND applications.joblistings_id = ? AND joblistings.users_id = ? AND applications.id = ?", [rating, reviewed, applicationUsersId, jobId, users_id, applicationId], cb);
    },
    getCVByIds: (jobId, users_id, appUsersId, appId, cb) => {
        return db.query("SELECT applications.cvFile FROM applications JOIN joblistings ON joblistings.id = applications.joblistings_id WHERE applications.joblistings_id = ? AND joblistings.users_id = ? AND applications.users_id = ? AND applications.id = ?", [jobId, users_id, appUsersId, appId], cb);
    },
    deleteById: (id, users_id, cb) => {
        return db.query("DELETE FROM applications WHERE id = ? AND users_id = ?", [id, users_id], cb);
    },
    getCVById: (id, users_id, cb) => {
        return db.query("SELECT cvFile FROM applications WHERE id = ? AND users_id = ?", [id, users_id], cb);
    }
}

module.exports = applications;