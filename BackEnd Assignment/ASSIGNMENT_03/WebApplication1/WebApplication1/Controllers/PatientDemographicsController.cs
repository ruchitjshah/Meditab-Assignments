using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Reflection;
using WebApplication1.DataAccessLayer;
using WebApplication1.Models;
using WebApplication1.ServiceLayer;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientDemographicsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPatientDemographicsSL _patientDemographicsSL;
        public PatientDemographicsController(IConfiguration configuration, IPatientDemographicsSL patientDemographicsSL)
        {
            _configuration = configuration;
            _patientDemographicsSL = patientDemographicsSL;
        }
        
        [HttpGet]
        public async Task<JsonResult> GetAll(int? id = null, string? firstname = null, string? lastname = null, string? gender = null, string? dob = null, string? oderby_value = null, int? pagenumber = null, int? pagesize = null  )
        {
            try 
            {
                return new JsonResult(await _patientDemographicsSL.GetAll(id, firstname, lastname, gender, dob, oderby_value, pagenumber, pagesize));
            }
            catch(Exception ex) 
            {
                return new JsonResult(ex);
            }

        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            try
            {
                return new JsonResult(await _patientDemographicsSL.Get(id));
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [HttpGet("getdeleteddata")]
        public JsonResult GetDeletedData()
        {
            string query = @"
                select chartnumber, firstname, middlename, lastname, to_char(dob,'YYYY-MM-DD') as ""dob"", gender_id
                from patient_demographics where is_deleted = true
            ";

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

        [HttpPost]
        public async Task<JsonResult> InsertData(PatientDemographicsModel pt)
        {
            try
            {
                return new JsonResult(await _patientDemographicsSL.InsertData(pt));
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<JsonResult> UpdateData(int id, PatientDemographicsModel pt)
        {
            try
            {
                return new JsonResult(await _patientDemographicsSL.UpdateData(id, pt));
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> DeleteUser(int id)
        {
            try
            {
                return new JsonResult(await _patientDemographicsSL.DeleteUser(id));
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
            
        }
    }
}
