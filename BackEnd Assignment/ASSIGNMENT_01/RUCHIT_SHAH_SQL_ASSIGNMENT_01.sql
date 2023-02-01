create table gender(
	gender_id serial primary key,
	gender_value varchar(10) not null,
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);

insert into gender(gender_value) values ('Male');
insert into gender(gender_value) values ('Female');
insert into gender(gender_value) values ('Unknown');
--update gender set gender_value = 'Female' where gender_id = 2;
select * from gender;


create table phone_type(
	phone_type_id serial primary key,
	phone_type_value varchar(10) not null,
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);
insert into phone_type(phone_type_value) values ('Cell');
insert into phone_type(phone_type_value) values ('Landline');
select * from phone_type;



create table address_type(
	address_type_id serial primary key,
	address_type_value varchar(10),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);
insert into address_type(address_type_value) values ('Home');
insert into address_type(address_type_value) values ('Work');
insert into address_type(address_type_value) values ('Others');
select * from address_type;


create table race_type(
	race_type_id serial primary key,
	race_value varchar(20) not null,
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);
insert into race_type(race_value) values ('African');
insert into race_type(race_value) values ('Indian');
insert into race_type(race_value) values ('Others');
select * from race_type;



create table preference_type(
	preference_type_id serial primary key,
	preference_type varchar(30) not null,
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);
insert into preference_type(preference_type) values ('Primary');
insert into preference_type(preference_type) values ('Secondary');
insert into preference_type(preference_type) values ('Others');
select * from preference_type;


create table patient_demographics(
	patient_id serial primary key,
	chartnumber varchar(100) not null generated always as ('CHART'||patient_id::text) stored,
	firstname varchar(30) not null,
	middlename varchar(30),
	lastname varchar(30) not null,
	dob date,
	gender_id int references gender(gender_id),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null,
    is_deleted bool default false
);
insert into patient_demographics(firstname,lastname,gender_id) values ('ruchit','shah',1);
insert into patient_demographics(firstname,lastname,gender_id,dob) values ('Meet','Vachhani',1,'2000-01-23');
insert into patient_demographics(firstname,lastname,gender_id,dob) values ('Nikita','Mirchandani',2,'2002-01-09');
select * from patient_demographics;


--ALTER TABLE patient_demographics   
--ADD COLUMN patient_image VARCHAR default ;  


create table address(
	address_id serial primary key,
	patient_id int references patient_demographics(patient_id),
	street varchar(30),
	city varchar(20),
	zip varchar(20),
	state varchar(30),
	country varchar(50),
	address_type_id int references address_type(address_type_id),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
	
);
insert into address(patient_id, street, city, zip, state, country, address_type_id) values(1,'JayBhanu Soc.','Ahmedabad','380061','','',1);
insert into address(patient_id, street, city, zip, state, country, address_type_id) values(1,'Ambavaadi','Ahmedabad','380080','','',1);
insert into address(patient_id, street, city, zip, state, country, address_type_id) values(2,'University Road.','Rajkot','370001','','',1);
insert into address(patient_id, street, city, zip, state, country, address_type_id) values(3,'Sattadhar char rasta','Ahmedabad','380061','','',1);
--update address set primary_address = 'true' where address_id = 1;
select * from address;


create table phone(
	phone_id serial primary key,
	address_id int references address(address_id),
	phone_number varchar,
	phone_type_id int references phone_type(phone_type_id),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
	
);
insert into phone(address_id, phone_number, phone_type_id) values(1,'9879906894',1);
insert into phone(address_id, phone_number, phone_type_id) values(2,'9099068571',1);
insert into phone(address_id, phone_number, phone_type_id) values(3,'1234567890',1);
--alter table phone alter column phone_number type varchar(10);
select * from phone;

create table fax(
	fax_id serial primary key,
	address_id int references address(address_id),
	fax_number varchar,
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
	
);
--alter table fax alter column fax_number type varchar(10);
insert into fax(address_id, fax_number) values(1,'102050');
insert into fax(address_id, fax_number) values(2,'102025');
insert into fax(address_id, fax_number) values(3,'102060');
select * from fax;

create table race(
	race_id serial primary key,
	patient_id int references patient_demographics(patient_id),
	race_type_id int references race_type(race_type_id),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);

insert into race(patient_id, race_type_id) values(1,2);
insert into race(patient_id, race_type_id) values(2,2);
insert into race(patient_id, race_type_id) values(3,3);
select * from race;



create table preference(
	preference_id serial primary key,
	preference_type_id int references preference_type(preference_type_id),
	patient_id int references patient_demographics(patient_id),
	address_id int references address(address_id),
	phone_id int references phone(phone_id),
	fax_id int references fax(fax_id),
	created_on timestamp default current_timestamp not null,
    modified_on timestamp default current_timestamp not null
);
insert into preference(preference_type_id, patient_id, address_id, phone_id, fax_id) values(1,1,1,1,1);
insert into preference(preference_type_id, patient_id, address_id, phone_id, fax_id) values(2,1,2,1,1);
select * from preference;
















