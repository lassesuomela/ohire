show databases;
use ohire;
show tables;

describe users;
describe meetings;


select * from users;
select * from meetings;
select * from participants;
select * from applications;
select * from jobListings;

insert into users (username, password, email, role, uuid) values ("taaperi", "qweasd", "tanne@testi.com", 1, "1231231313123123");
insert into meetings (timestamp, description) values ("2022-11-02 12:00:00", "Job intervie for Company XYZ");
insert into participants (meetings_id, users_id) values (3, 4);
insert into applications (timestamp, application, cvFile, applicationFile, users_id, joblistings_id) values ("2022-08-05 18:16:20", "very fancy application", "/file/applicaitons", "/file/cv", 34, 11);

select users.username, users.uuid, meetings.timestamp, meetings.description, meetings.id, participants.meetings_id
	from users 
    left JOIN participants on participants.users_id = users.id and users.id = 1
     join meetings on participants.meetings_id = meetings.id;
     
select users.username, users.uuid, meetings.timestamp, meetings.description 
from users
      (join participants on users.id = participants.users_id)
     and participants.meetings_id = 1
     and participants.users_id != 1
      join meetings
     on participants.meetings_id = meetings.id;
	
#select all meetings for specific user based on user is
SELECT users.username, users.uuid, meetings.id as 'meetingId',
       meetings.timestamp, meetings.description
FROM participants p1
     inner join participants p2 on p2.meetings_id = p1.meetings_id
     inner join users on users.id = p2.users_id
     inner join meetings on meetings.id = p2.meetings_id
WHERE p1.users_id=1 AND p2.users_id<>1;

# select all applications made with specifed user id
SELECT users.username, applications.timestamp, joblistings.title
FROM applications
	JOIN users on users.id = applications.users_id
    JOIN joblistings on joblistings.id = applications.joblistings_id
WHERE users.id = 34;
