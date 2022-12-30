create table gender(
	gender_id serial primary key,
	gender_value varchar(10) not null
);

insert into gender(gender_value) values ('Male');
insert into gender(gender_value) values ('Female');
insert into gender(gender_value) values ('Unknown');
select * from gender;

create table phone_type(
	phone_type_id serial primary key,
	phone_type_value varchar(10) not null
);

create table address_type(
	address_type_id serial primary key,
	address_type_value varchar(10)
);

create table race_type(
	race_type_id serial primary key,
	race_value varchar(20) not null
);

create table preference_type(
	preference_type_id serial primary key,
	preference_type varchar(30) not null
);

create table patient_demographics(
	patient_id serial primary key,
	chartnumber varchar(100) not null generated always as ('CHART'||patient_id::text) stored,
	firstname varchar(30) not null,
	middlename varchar(30),
	lastname varchar(30) not null,
	dob date,
	gender int references gender(gender_id)
);

insert into patient_demographics(firstname,lastname,gender) values ('ruchit','shah',1);

select * from patient_demographics;

create table address(
	address_id serial primary key,
	patient_id int references patient_demographics(patient_id),
	street varchar(30),
	city varchar(20),
	zip varchar(20),
	state varchar(30),
	country varchar(50),
	address_type int references address_type(address_type_id),
	primary_address boolean default 'false'
);

create table phone(
	phone_id serial primary key,
	address_id int references address(address_id),
	phone_number int,
	phone_type int references phone_type(phone_type_id),
	primary_phone boolean default 'false'
);

create table fax(
	fax_id serial primary key,
	address_id int references address(address_id),
	fax_number int,
	primary_fax boolean default 'false'
);

create table race(
	race_id serial primary key,
	patient_id int references patient_demographics(patient_id),
	race_type int references race_type(race_type_id)
);

create table preference(
	preference_id serial primary key,
	preference_type int references preference_type(preference_type_id),
	patient_id int references patient_demographics(patient_id),
	address_id int references address(address_id),
	phone_id int references phone(phone_id),
	fax_id int references fax(fax_id)
);

















