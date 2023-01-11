using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Assignment3API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientDemographicsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PatientDemographicsController(IConfiguration configuration)
        {
            _configuration= configuration;
        }
        // GET: api/<PatientDemographicsController>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select firstname, middlename, lastname, dob, gender_id
                from patient_demographics
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

        // GET api/<PatientDemographicsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PatientDemographicsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PatientDemographicsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PatientDemographicsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
