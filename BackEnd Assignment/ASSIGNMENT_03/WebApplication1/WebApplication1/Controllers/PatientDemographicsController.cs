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

        /// <summary>
        /// This method returns the patient record by the id that will passed in get method
        /// </summary>
        /// <param name="id"></param>
        /// <returns>returns patient record in model format</returns>
        [HttpGet("{id}")]
        public async Task<PatientDemographicsModelList> Get(int id)
        {
            return await _patientDemographicsSL.Get(id);
        }

        /// <summary>
        /// This method is used for filtering data using Firstname, Lastname, Dob, Gender, and Patient Id. Also we can do pagination using it and sorting using firstname, lastname, patient id
        /// </summary>
        /// <param name="request"></param>
        /// <returns>Returns patient record</returns>
        [HttpPost("GetFilterData")]
        public async Task<PatientDemographicsModelList> GetFilterData(PatientDemographicsModelRequest request)
        {
                return await _patientDemographicsSL.GetFilterData(request);
        }

        /// <summary>
        /// This method is used for create/insert data of patient
        /// </summary>
        /// <param name="pt"></param>
        /// <returns>It will returns patient primary key</returns>
        [HttpPost]
        public async Task<int> InsertData(PatientDemographicsModelResponse pt)
        {
                return await _patientDemographicsSL.InsertData(pt);
        }

        /// <summary>
        /// This method is used for update the patient data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pt"></param>
        /// <returns>It will returns patient primary key</returns>
        [HttpPut("{id}")]
        public async Task<int> UpdateData(int id, PatientDemographicsModelResponse pt)
        {
                return await _patientDemographicsSL.UpdateData(id, pt);
        }

        /// <summary>
        /// This method is used for soft delete the user
        /// </summary>
        /// <param name="id"></param>
        /// <returns>It will return string</returns>
        [HttpDelete("{id}")]
        public async Task<string> DeleteUser(int id)
        {
            try
            {
                return await _patientDemographicsSL.DeleteUser(id);
            }
            catch (Exception ex)
            {
                return (ex.Message);
            }
            
        }
    }
}
