-- Get patient data by patient id
-- pagination and sorting
create or replace function patientget(pid int default null, 
fname varchar default null, 
lname varchar default null, 
fgender varchar default null, 
fdob date default null,
orderby_value varchar default null, 
pagenumber int default 1, 
pagesize int default 10)
returns table (firstname varchar, 
middlename varchar, 
lastname varchar, 
dob date, 
gender_id int)
language plpgsql
as
$$
declare
	query_var text :='select pd.firstname, pd.middlename, pd.lastname, pd.dob, pd.gender_id
		from patient_demographics pd left join gender g on g.gender_id = pd.gender_id where 1=1';
begin
	
	query_var := query_var 
	|| case when $1 is not null then ' and pd.patient_id=$1' else '' end
	|| case when $2 is not null then ' and pd.firstname=$2' else '' end
	|| case when $3 is not null then ' and pd.lastname=$3' else '' end
	|| case when $4 is not null then ' and g.gender_value=$4' else '' end 
	|| case when $5 is not null then ' and pd.dob=$5' else '' end 
	|| case when $6 is not null then ' order by $6 ASC' else 'order by firstname' end
	|| ' limit $8 offset (($7-1)*$8)';
	
	return query execute query_var using pid, fname, lname, fgender, fdob, orderby_value, pagenumber, pagesize;
	
end;
$$;

select * from patientget();

-- insert patient data
create or replace function patientcreate(fname varchar(100), mname varchar(100), lname varchar(100), dob date, gen int)
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

select patientcreate('Test2','S','Rana','2001-09-14',1);

-- update patient data
create or replace function patientupdate(pid int, fname varchar(100), mname varchar(100), lname varchar(100), dob date, gen int)
returns int
language plpgsql
as
$$
declare
	pk_record integer;
begin 
	UPDATE patient_demographics
    SET firstname = $2, middlename = $3, lastname = $4, dob = $5::date,  gender_id = $6
    Where patient_id = $1 and is_deleted = false returning patient_id into pk_record;
   	return pk_record;
end;
$$;

select patientupdate(9, 'Saumya', 'lalo', 'Shah', '2001-10-19', 1);

-- delete patient data
create or replace function patientdelete(pid int)
returns void
language plpgsql
as
$$
declare
begin 
	UPDATE patient_demographics
    SET is_deleted = true
    Where patient_id = $1;
end;
$$;

select patientdelete(8);



