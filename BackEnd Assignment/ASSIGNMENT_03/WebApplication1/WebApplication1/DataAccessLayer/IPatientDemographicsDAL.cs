using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.DataAccessLayer
{
    public interface IPatientDemographicsDAL
    {
        public Task<JsonResult> GetAll(int? id = null, string? firstname = null, string? lastname = null, string? gender = null, string? dob = null, string? oderby_value = null, int? pagenumber = null, int? pagesize = null);

        public Task<JsonResult> Get(int id);

        public Task<JsonResult> InsertData(PatientDemographicsModel pt);

        public Task<JsonResult> UpdateData(int id, PatientDemographicsModel pt);

        public Task<JsonResult> DeleteUser(int id);
    }
}
