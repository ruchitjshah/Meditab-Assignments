--1.0 Create View to fetch the result of FirstName, LastName, MiddleName, DOB, Chart Number, Sex , Race , Primary Address, Primary Phone, Primary Fax.
create or replace view patient_info_view as 
select firstname, middlename, lastname, dob, chartnumber, gender_id, race_type_id, street, city, state, country, phone_number, fax_number 
from patient_demographics pd
left join race r on pd.patient_id  = r.patient_id 
left join preference p on pd.patient_id = p.patient_id  and p.preference_type_id = 1
left join address a on p.address_id  = a.address_id 
left join phone ph on p.phone_id = ph.phone_id
left join fax f on p.fax_id = f.fax_id 

select * from patient_info_view;


--2.0 Write Query to fetch unique record from the Patient table based on Firstname, LastName, DOB and Sex with number of occurance(count) of same data.
select firstname, lastname, dob, gender_id, count(concat(firstname,lastname,dob,gender_id)) as "Occurance" from patient_demographics group by firstname,lastname, dob, gender_id;


--3.0 Create Function to stored the data into patient table. Pass all the value in the function parameter and function should return the created new primary key value of the table.
create or replace function insert_patient_info(fname varchar(100), mname varchar(100), lname varchar(100), dob date, gen int)
returns int
language plpgsql
as
$$
declare
	pk_record integer;
begin 
	insert into patient_demographics(firstname, middlename, lastname, dob, gender_id) values(fname, mname, lname, dob, gen);
	select patient_id into pk_record from patient_demographics order by patient_id desc limit 1;
	return pk_record;
end;
$$;

select insert_patient_info('Dhruvil','R','Chaudhary','2001-09-10',1);


--4.0 Create Function to get the result of patient’s data by using patientId, lastname, firstname, sex, dob. Need to implement the pagination and 
--sorting(LastName, Firstname, Sex, DOB) in this function.
create or replace function get_patient_data(pid int default null, fname varchar default null, lname varchar default null, fgender int default null, fdob date default null, pagenumber int default 1, pagesize int default 10)
returns table (firstname varchar, middlename varchar, lastname varchar, dob date, gender varchar)
language plpgsql
as
$$
declare
	query_var text := 'select pd.firstname, pd.middlename, pd.lastname, pd.dob, g.gender_value as gender
		from patient_demographics pd left join gender g on g.gender_id = pd.gender_id where 1=1 ';
	where_var text;
	order_var text := ' order by pd.firstname asc, pd.lastname asc, g.gender_value asc, pd.dob asc ';
	pagination_var text := 'limit '||pagesize||' offset (('||pagenumber-1||')*'||pagesize||');';
	final_query text;
begin
	if pid is null and fname is null and lname is null and fgender is null and fdob is null then 
		return query execute query_var||order_var||pagination_var;
	elsif pid is not null then
		where_var := 'and pd.patient_id='||pid;
		return query execute query_var||where_var||order_var||pagination_var;
	elsif fname is not null then
		where_var := 'and pd.firstname='||''''||fname||'''';
		return query execute query_var||where_var||order_var||pagination_var;
	elsif lname is not null then
		where_var := 'and pd.lastname='||''''||lname||'''';
		return query execute query_var||where_var||order_var||pagination_var;
	elsif fgender is not null then
		where_var := 'and g.gender_value='||''''||fgender||'''';
		return query execute query_var||where_var||order_var||pagination_var;
	elsif fdob is not null then
		where_var := 'and pd.dob='||''''||fdob||'''';
		return query execute query_var||where_var||order_var||pagination_var;
	end if;
end;
$$;

select * from get_patient_data();
select * from get_patient_data(pid => 1);
select * from get_patient_data(lname => 'shah');
select * from get_patient_data(pagenumber => 1, pagesize => 2);


--5.0 Write Query to search the patient by patient’s phone no
create or replace function get_patient_info_using_phone(phone_no varchar)
returns table (firstname varchar, middlename varchar, lastname varchar, dob date, gender varchar)
language plpgsql
as
$$
declare
begin
	return query select pd.firstname, pd.middlename, pd.lastname, pd.dob, g.gender_value as gender
		from
		patient_demographics pd
		left join gender g on g.gender_id = pd.gender_id   
		left join address a on pd.patient_id  = a.patient_id  
		left join phone ph on a.patient_id = ph.address_id and a.patient_id = pd.patient_id 
		where ph.phone_number = phone_no;
end;
$$;

select * from get_patient_info_using_phone('9879906894');
select * from get_patient_info_using_phone('9099068571');


