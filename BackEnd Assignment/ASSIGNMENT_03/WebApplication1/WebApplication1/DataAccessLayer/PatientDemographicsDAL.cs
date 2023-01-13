using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Transactions;
using WebApplication1.Models;

namespace WebApplication1.DataAccessLayer
{
    public class PatientDemographicsDAL: IPatientDemographicsDAL
    {
        private readonly IConfiguration _configuration; 
        public PatientDemographicsDAL(IConfiguration configuration) {
            _configuration = configuration;
        }

        /// <summary>
        /// This method returns the patient record by the id that will passed in get method
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns patient record in model format</returns>
        public Task<PatientDemographicsModelList> Get(int id)
        {
            PatientDemographicsModelList PatientData = new PatientDemographicsModelList
            {
                PatientDemographics = new List<PatientDemographicsModelResponse>()
            };

            try
            {
                string query = @"
                select * from patientget(pid => @Id)
            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("Id", id);
                       
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        for (int i = 0; i < table.Rows.Count; i++)
                        {
                            DataRow dr = table.Rows[i];
                            PatientData.PatientDemographics.Add(
                                new PatientDemographicsModelResponse
                                {
                                    firstname = dr["firstname"].ToString(),
                                    lastname = dr["lastname"].ToString(),
                                    middlename = dr["middlename"].ToString(),
                                    dob = dr["dob"] == DBNull.Value ? null : DateTime.Parse(dr["dob"].ToString()),
                                    gender_id = (int)dr["gender_id"],
                                }
                                );
                        }
                        myReader.Close();
                        myCon.Close();

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Task.FromResult(PatientData);
        }

        /// <summary>
        /// This method is used for filtering data using Firstname, Lastname, Dob, Gender, and Patient Id. Also we can do pagination using it and sorting using firstname, lastname, patient id
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Returns patient record</returns>
        public Task<PatientDemographicsModelList> GetFilterData(PatientDemographicsModelRequest request)
        {
            PatientDemographicsModelList PatientData = new PatientDemographicsModelList
            {
                PatientDemographics = new List<PatientDemographicsModelResponse>()
        };
                
            try
            {
                string query = @"
                select * from patientget(pid => @Id, fname => @Firstname, lname => @Lastname, fgender => @Gender_id, fdob => @Dob, orderby_value => @Orderby, pagenumber => @Pagenumber, pagesize => @Pagesize)
            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("Id", request.patient_id == null ? DBNull.Value : request.patient_id);
                        myCommand.Parameters.AddWithValue("Firstname", request.firstname == null || request.firstname == "" ? DBNull.Value : request.firstname);
                        myCommand.Parameters.AddWithValue("Lastname", request.lastname == null || request.lastname == "" ? DBNull.Value : request.lastname);
                        myCommand.Parameters.AddWithValue("Dob", request.dob == null ? DBNull.Value : request.dob);
                        myCommand.Parameters.AddWithValue("Gender_id", request.gender_id == null ? DBNull.Value : request.gender_id);
                        myCommand.Parameters.AddWithValue("Pagenumber", request.pagenumber == null ? DBNull.Value : request.pagenumber);
                        myCommand.Parameters.AddWithValue("Pagesize", request.pagesize == null ? DBNull.Value : request.pagesize);
                        myCommand.Parameters.AddWithValue("Orderby", request.orderby == null || request.orderby == "" ? DBNull.Value : request.orderby);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        for (int i = 0; i < table.Rows.Count; i++)
                        {
                            DataRow dr = table.Rows[i];
                            PatientData.PatientDemographics.Add(
                                new PatientDemographicsModelResponse
                                {
                                    firstname = dr["firstname"].ToString(),
                                    lastname = dr["lastname"].ToString(),
                                    middlename = dr["middlename"].ToString(),
                                    dob = dr["dob"] == DBNull.Value ? null : DateTime.Parse(dr["dob"].ToString()),
                                    gender_id = (int)dr["gender_id"],
                                }
                                );
                        }
                        myReader.Close();
                        myCon.Close();

                    }
                } 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Task.FromResult(PatientData);
        }

        /// <summary>
        /// This method is used for create/insert data of patient
        /// </summary>
        /// <param name="pt"></param>
        /// <returns>It will returns patient primary key</returns>
        public Task<int> InsertData(PatientDemographicsModelResponse pt)
        {
            int response_id=0;
            using (TransactionScope transactionScope = new TransactionScope())
            {
                try
                {
                    string query = @"
                select * from patientcreate(@Fname,@Maname,@Lname,@Dob::date,@Gender)";

                    DataTable table = new DataTable();
                    string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                    NpgsqlDataReader myReader;
                    using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                        {

                            myCommand.Parameters.AddWithValue("Fname", pt.firstname);
                            myCommand.Parameters.AddWithValue("Maname", pt.middlename);
                            myCommand.Parameters.AddWithValue("Lname", pt.lastname);
                            myCommand.Parameters.AddWithValue("Dob", pt.dob);
                            myCommand.Parameters.AddWithValue("Gender", pt.gender_id);
                            myReader = myCommand.ExecuteReader();
                            myReader.Read();
                            response_id = (int)myReader[0];

                            
                            myReader.Close();
                            transactionScope.Complete();
                            myCon.Close();

                        }
                    }
                }
                catch (Exception ex)
                {
                    transactionScope.Dispose();
                    Console.WriteLine(ex.Message);
                }
                return Task.FromResult(response_id);
            }
        }

        /// <summary>
        /// This method is used for update the patient data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pt"></param>
        /// <returns>It will returns patient primary key</returns>
        public Task<int> UpdateData(int id, PatientDemographicsModelResponse pt)
        {
            int response_id=0;
            using (TransactionScope transactionScope = new TransactionScope())
            {
                try
                {
                    string query = @"
                                    select patientupdate(@id,@Fname,@Mname,@Lname,@Dob::date,@Gender)
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
                            myReader.Read();
                            response_id = (int)myReader[0];

                            
                            myReader.Close();
                            transactionScope.Complete();
                            myCon.Close();

                        }
                    }
                    
                }
                catch (Exception ex)
                {
                    transactionScope.Dispose();
                    Console.WriteLine(ex.Message);
                }
                return Task.FromResult(response_id);
            }
        }

        /// <summary>
        /// This method is used for soft delete the user
        /// </summary>
        /// <param name="id"></param>
        /// <returns>It will return string</returns>
        public Task<string> DeleteUser(int id)
        {
            using (TransactionScope transactionScope = new TransactionScope())
            {
                try
                {
                    string query = @"select patientdelete(@id);";

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
                            transactionScope.Complete();
                            myCon.Close();
                        }
                    }
                    return Task.FromResult("Daleted Successfully");
                }
                catch (Exception ex)
                {
                    transactionScope.Dispose();
                    return Task.FromResult(ex.Message);
                }
            }    
        }
    }
}
