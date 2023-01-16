
--1.0 Create View to fetch the result of FirstName, LastName, MiddleName, DOB, Chart Number, Sex , Race , Primary Address, Primary Phone, Primary Fax.
create or replace view patient_info_view as 
select firstname, middlename, lastname, dob, chartnumber, gender_id, race_type_id, street, city, state, country, phone_number, fax_number 
from patient_demographics pd
left join race r on pd.patient_id  = r.patient_id 
left join preference_type pt on pt.preference_type = 'Primary'
left join preference p on pd.patient_id = p.patient_id  and p.preference_type_id = pt.preference_type_id 
left join address a on p.address_id  = a.address_id 
left join phone ph on p.phone_id = ph.phone_id
left join fax f on p.fax_id = f.fax_id 

select * from patient_info_view;

select * from patient_demographics pd;
--2.0 Write Query to fetch unique record from the Patient table based on Firstname, LastName, DOB and Sex with number of occurance(count) of same data.
select firstname, lastname, dob, gender_id, count(patient_id) as "Occurance" 
from patient_demographics 
group by firstname,lastname, dob, gender_id;


--3.0 Create Function to stored the data into patient table. Pass all the value in the function parameter and function should return the created new primary key value of the table.
create or replace function insert_patient_info(fname varchar(100), mname varchar(100), lname varchar(100), dob date, gen int)
returns int
language plpgsql
as
$$
declare
	pk_record integer;
begin 
	insert into patient_demographics(firstname, middlename, lastname, dob, gender_id) values($1, $2, $3, $4, $5) returning patient_id into pk_record;
	return pk_record;
end;
$$;

select insert_patient_info('Hemit','S','Rana','2001-09-14',1);

select * from patient_demographics pd;

--4.0 Create Function to get the result of patient’s data by using patientId, lastname, firstname, sex, dob. Need to implement the pagination and 
--sorting(LastName, Firstname, Sex, DOB) in this function.
create or replace function get_patient_data(pid int default null, 
fname varchar default null, 
lname varchar default null, 
fgender varchar default null, 
fdob date default null,
orderby_value varchar default 'firstname', 
pagenumber int default 1, 
pagesize int default 10)
returns table (firstname varchar, 
middlename varchar, 
lastname varchar, 
dob date, 
gender varchar)
language plpgsql
as
$$
declare
	query_var text :='select pd.firstname, pd.middlename, pd.lastname, pd.dob, g.gender_value as gender
		from patient_demographics pd left join gender g on g.gender_id = pd.gender_id where 1=1';
begin
	
	query_var := query_var 
	|| case when $1 is not null then ' and pd.patient_id=$1' else '' end
	|| case when $2 is not null then ' and pd.firstname=$2' else '' end
	|| case when $3 is not null then ' and pd.lastname=$3' else '' end
	|| case when $4 is not null then ' and g.gender_value=$4' else '' end 
	|| case when $5 is not null then ' and pd.dob=$5' else '' end 
	|| ' order by '||$6||' ASC'
	|| ' limit $8 offset (($7-1)*$8)';
	
	return query execute query_var using pid, fname, lname, fgender, fdob, orderby_value, pagenumber, pagesize;
	
end;
$$;

select * from get_patient_data();
select * from get_patient_data(orderby_value => 'lastname');
select * from get_patient_data(pid => 1, fname => 'ruchit', lname => 'shah', fgender => 'Male', orderby_value => 'lastname');
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


