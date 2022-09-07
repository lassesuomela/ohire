show databases;
use ohire;
show tables;

describe users;
describe meetings;
describe applications;

select * from users;
select * from meetings;
select * from participants;
select * from applications;
select * from jobListings;

insert into users (username, password, email, role, uuid) values ("taaperi", "qweasd", "tanne@testi.com", 1, "1231231313123123");
insert into meetings (timestamp, description, joblistings_id) values ("2022-11-07 12:00:00", "Job interview", 30);
insert into participants (meetings_id, users_id) values (4, 34);
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
SELECT applications.id as 'applicationId', applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId'
FROM applications
    JOIN joblistings on joblistings.id = applications.joblistings_id
WHERE applications.users_id = 34;

# select all applications made with specifed joblistings id  and 
SELECT users.username, applications.id as 'applicationId', applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId'
FROM applications
    JOIN joblistings on joblistings.id = applications.joblistings_id
    JOIN users on users.id = applications.users_id
WHERE applications.joblistings_id = 12 AND jobListings.users_id = 34;

# select applicaiton data made with specifed application id
SELECT users.username, applications.timestamp, applications.application, applications.cvFile, applications.applicationFile, applications.rating, applications.users_id, applications.joblistings_id, joblistings.title
FROM applications
	JOIN users on users.id = applications.users_id
    JOIN joblistings on joblistings.id = applications.joblistings_id
WHERE applications.id = 17 AND applications.joblistings_id = 13;


SELECT applications.id as 'applicationId', applications.timestamp, joblistings.title, joblistings.id as 'joblistingsId'
FROM applications
JOIN joblistings on joblistings.id = applications.joblistings_id
WHERE applications.users_id = ?
ORDER BY applications.timestamp DESC;

update users set uuid="53244776-7e8f-4999-bf77-afedb49b7dcd" where username = "mayday";

SELECT joblistings.id, joblistings.timestamp, joblistings.description, joblistings.title, joblistings.salary, joblistings.users_id, joblistings.workingTime, COUNT(applications.id) as 'applicationCount'
FROM joblistings
	LEFT JOIN applications ON applications.joblistings_id = joblistings.id
WHERE joblistings.users_id = 34
GROUP BY joblistings.id;

SELECT COUNT(id) FROM joblistings WHERE users_id = 44;

SELECT users.username, applications.timestamp, applications.application, applications.cvFile, applications.applicationFile, applications.rating, applications.users_id, applications.joblistings_id, joblistings.title
FROM applications
JOIN users on users.id = applications.users_id
JOIN joblistings on joblistings.id = applications.joblistings_id
WHERE applications.id = 22 AND applications.joblistings_id = 30 AND joblistings.users_id = 34;

UPDATE applications
INNER JOIN joblistings ON joblistings.id = applications.joblistings_id
SET applications.rating = 1, applications.reviewed = 1
WHERE applications.users_id = 34 AND applications.joblistings_id = 12 AND joblistings.users_id = 34 AND applications.id = 13;

SELECT joblistings.id, joblistings.timestamp, joblistings.description, joblistings.title, joblistings.salary, joblistings.users_id, joblistings.workingTime, COUNT(applications.id) as 'applicationCount'
FROM joblistings
LEFT JOIN applications ON applications.joblistings_id = joblistings.id
WHERE joblistings.users_id = 44
GROUP BY joblistings.id
ORDER BY id DESC LIMIT 0, 10;

SELECT COUNT(id) AS maxCount FROM joblistings WHERE users_id = 44;

SELECT applications.cvFile
FROM applications JOIN joblistings ON joblistings.id = applications.joblistings_id
WHERE applications.joblistings_id = 38 AND joblistings.users_id = 44 AND applications.users_id = 34 AND applications.id = 57;

delete from jobListings where LENGTH(description) < 100;