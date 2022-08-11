const db = require('../configs/db');

const applications = {
    add: (data, cb) =>{
        return db.query("INSERT INTO meetings (timestamp, description) VALUES (?, ?); INSERT INTO participants (meetings_id, users_id) VALUES (?, ?)", [data.timestamp, data.description, data.meetings_id, data.users_id], cb);
    },
    getByUsersId: (id, cb) => {
        return db.query("SELECT users.username, users.uuid, meetings.id as 'meetingId', meetings.timestamp, meetings.description FROM participants p1 inner join participants p2 on p2.meetings_id = p1.meetings_id inner join users on users.id = p2.users_id inner join meetings on meetings.id = p2.meetings_id WHERE p1.users_id = ? AND p2.users_id <> ?", [id, id], cb);
    }
}

module.exports = applications;