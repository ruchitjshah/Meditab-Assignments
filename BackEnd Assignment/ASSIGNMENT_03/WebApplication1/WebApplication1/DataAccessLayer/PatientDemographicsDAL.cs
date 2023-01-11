using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using WebApplication1.Models;

namespace WebApplication1.DataAccessLayer
{
    public class PatientDemographicsDAL: IPatientDemographicsDAL
    {
        private readonly IConfiguration _configuration; 
        public PatientDemographicsDAL(IConfiguration configuration) {
            _configuration = configuration;
        }

        public async Task<JsonResult> GetAll(int? id, string? firstname, string? lastname, string? gender, string? dob, string? oderby_value, int? pagenumber, int? pagesize)
        {
            try
            {
                string query = $"select * from get_patient_info()";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();

                    }
                }
                return new JsonResult(table);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        public async Task<JsonResult> Get(int id)
        {
            try
            {
                string query = @"
                select * from get_patient_info_by_id(@Patient_id)
            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("Patient_id", id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();

                    }
                }
                return new JsonResult(table);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        public async Task<JsonResult> InsertData(PatientDemographicsModel pt)
        {
            try
            {
                string query = @"
                select * from insert_patient_info(@Fname,@Maname,@Lname,@Dob::date,@Gender)";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {

                        myCommand.Parameters.AddWithValue("@Fname", pt.firstname);
                        myCommand.Parameters.AddWithValue("@Maname", pt.middlename);
                        myCommand.Parameters.AddWithValue("@Lname", pt.lastname);
                        myCommand.Parameters.AddWithValue("@Dob", pt.dob);
                        myCommand.Parameters.AddWithValue("@Gender", pt.gender_id);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        myCon.Close();

                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        public async Task<JsonResult> UpdateData(int id, PatientDemographicsModel pt)
        {
            try
            {
                string query = @"
            select update_patient_info(@id,@Fname,@Mname,@Lname,@Dob::date,@Gender)
        ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("id", id);
                        myCommand.Parameters.AddWithValue("Fname", pt.firstname);
                        myCommand.Parameters.AddWithValue("Mname", pt.middlename);
                        myCommand.Parameters.AddWithValue("Lname", pt.lastname);
                        myCommand.Parameters.AddWithValue("Dob", pt.dob);
                        myCommand.Parameters.AddWithValue("Gender", pt.gender_id);
                        myReader = myCommand.ExecuteReader();

                        myReader.Close();
                        myCon.Close();

                    }
                }
                return new JsonResult("Update Successfully");
            }
            catch (Exception ex)
            {

                return new JsonResult(ex);
            }
        }

        public async Task<JsonResult> DeleteUser(int id)
        {
            try
            {
                string query = @"
            select delete_patient_info(@id);";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("id", id);
                        myReader = myCommand.ExecuteReader();

                        myReader.Close();
                        myCon.Close();
                    }
                }
                return new JsonResult("Daleted Successfully");
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }
    }
}
