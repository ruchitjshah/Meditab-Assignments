using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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

        public object nullCheck(int? val)
        {
            return val == null ? DBNull.Value : val;
        }

        public object nullCheck(string? val)
        {
            return val == null || val == "" ? DBNull.Value : val;
        }

        public object nullCheck(DateTime? val)
        {
            return val == null ? DBNull.Value : val;
        }

        /// <summary>
        /// This method returns the patient record by the id that will passed in get method
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns patient record in model format</returns>
        public async Task<dynamic> Get(int id)
        {
            PatientDemographicsModelList PatientData = new PatientDemographicsModelList
            {
                PatientDemographics = new List<PatientDemographicsModelResponse>()
            };

            string imagepath = "assets\\patientimages\\default.png";

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

                        if(table.Rows.Count == 0) {
                            return await Task.FromResult(-1);
                        }
                        if(File.Exists("wwwroot\\assets\\patientimages\\PatientProfile" + id.ToString() + ".jpg")){
                            imagepath = "assets\\patientimages\\PatientProfile" + id.ToString() + ".jpg";
                        }
                        DataRow dr = table.Rows[0];
                        PatientData.PatientDemographics.Add(
                        new PatientDemographicsModelResponse
                        {
                                    chartnumber = dr["chartnumber"].ToString(),
                                    firstname = dr["firstname"].ToString(),
                                    lastname = dr["lastname"].ToString(),
                                    middlename = dr["middlename"].ToString(),
                                    dob = dr["dob"] == DBNull.Value ? null : Convert.ToDateTime(dr["dob"].ToString()),
                                    gender_id = (int)dr["gender_id"],
                                    patient_image = imagepath
                        });

                        myReader.Close();
                        myCon.Close();

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return await Task.FromResult(PatientData);
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
                select * from patientget(pid => @Id, fname => @Firstname, lname => @Lastname, fgender => @Gender_id, fdob => @Dob, orderby_value => @Orderby, pagenumber => @Pagenumber, pagesize => @Pagesize, sort_method => @Sortmethod)
            ";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                NpgsqlDataReader myReader;
                using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                    {
                        myCommand.Parameters.AddWithValue("Id", nullCheck(request.patient_id));
                        myCommand.Parameters.AddWithValue("Firstname", nullCheck(request.firstname));
                        myCommand.Parameters.AddWithValue("Lastname", nullCheck(request.lastname));
                        myCommand.Parameters.AddWithValue("Dob", nullCheck(request.dob));
                        myCommand.Parameters.AddWithValue("Gender_id", nullCheck(request.gender_id));
                        myCommand.Parameters.AddWithValue("Pagenumber", nullCheck(request.pagenumber));
                        myCommand.Parameters.AddWithValue("Pagesize", nullCheck(request.pagesize));
                        myCommand.Parameters.AddWithValue("Orderby", nullCheck(request.orderby));
                        myCommand.Parameters.AddWithValue("Sortmethod", nullCheck(request.sortmethod));
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        for (int i = 0; i < table.Rows.Count; i++)
                        {
                            DataRow dr = table.Rows[i];
                            PatientData.PatientDemographics.Add(
                                new PatientDemographicsModelResponse
                                {
                                    chartnumber = dr["chartnumber"].ToString(),
                                    firstname = dr["firstname"].ToString(),
                                    lastname = dr["lastname"].ToString(),
                                    middlename = dr["middlename"].ToString(),
                                    dob = dr["dob"] == DBNull.Value ? null :Convert.ToDateTime(dr["dob"].ToString()),
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
                select * from patientcreate(@Fname,@Mname,@Lname,@Dob::date,@Gender)";

                    DataTable table = new DataTable();
                    string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                    NpgsqlDataReader myReader;
                    using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                        {

                            myCommand.Parameters.AddWithValue("Fname", pt.firstname == null || pt.firstname == ""? throw new NoNullAllowedException(): pt.firstname);
                            myCommand.Parameters.AddWithValue("Mname", pt.middlename == null || pt.middlename == ""? DBNull.Value: pt.middlename);
                            myCommand.Parameters.AddWithValue("Lname", pt.lastname == null || pt.lastname == "" ? throw new NoNullAllowedException() : pt.lastname);
                            myCommand.Parameters.AddWithValue("Dob", pt.dob == null || pt.dob.ToString() == ""? DBNull.Value: pt.dob);
                            myCommand.Parameters.AddWithValue("Gender", pt.gender_id == null || pt.gender_id == 0 ? throw new NoNullAllowedException() : pt.gender_id);
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
                            myCommand.Parameters.AddWithValue("Fname", pt.firstname == null || pt.firstname == "" ? throw new NoNullAllowedException() : pt.firstname);
                            myCommand.Parameters.AddWithValue("Mname", pt.middlename == null || pt.middlename == "" ? DBNull.Value : pt.middlename);
                            myCommand.Parameters.AddWithValue("Lname", pt.lastname == null || pt.lastname == "" ? throw new NoNullAllowedException() : pt.lastname);
                            myCommand.Parameters.AddWithValue("Dob", pt.dob == null || pt.dob.ToString() == "" ? DBNull.Value : pt.dob);
                            myCommand.Parameters.AddWithValue("Gender", pt.gender_id == null || pt.gender_id == 0 ? throw new NoNullAllowedException() : pt.gender_id);
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

        /*public Task<int> UploadImage(string filename, int id)
        {
            using (TransactionScope transactionScope = new TransactionScope())
            {
                try
                {
                    string query = @"update patient_demographics set patient_image = @FileName where  patient_id = @Id";

                    DataTable table = new DataTable();
                    string sqlDataSource = _configuration.GetConnectionString("DBConnectionStr");
                    NpgsqlDataReader myReader;
                    using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                        {
                            myCommand.Parameters.AddWithValue("Id", id);
                            myCommand.Parameters.AddWithValue("FileName", id);
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
        }*/
    }
}
