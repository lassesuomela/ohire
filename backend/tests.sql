show databases;
use ohire;
show tables;

describe users;
describe meetings;


select * from users;
select * from meetings;
select * from participants;

insert into users (username, password, email, role, uuid) values ("lasse", "qweasd", "lasse@testi.com", 2, "d58cce39-b695-415a-b62a-d169d5981229");
insert into meetings (timestamp, description) values ("2022-11-15 12:00:00", "Job intervie for Company Y");
insert into participants (meetings_id, users_id) values (1, 2);

select * from meetings where id = (select participants.meetings_id from participants join users on participants.users_id = users.id where users.id = 1);
select * from participants where id = (select participants.meetings_id from participants join users on participants.users_id = users.id where users.id = 1);