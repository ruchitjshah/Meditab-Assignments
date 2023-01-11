using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using WebApplication1.DataAccessLayer;
using WebApplication1.Models;

namespace WebApplication1.ServiceLayer
{
    public class PatientDemographicsSL: IPatientDemographicsSL
    {
        private readonly IPatientDemographicsDAL _patientDemographicsDAL;
        public PatientDemographicsSL(IPatientDemographicsDAL patientDemographicsDAL) {
            _patientDemographicsDAL = patientDemographicsDAL;
        }

        public async Task<JsonResult> DeleteUser(int id)
        {
            return await _patientDemographicsDAL.DeleteUser(id);
        }

        public async Task<JsonResult> Get(int id)
        {
            return await _patientDemographicsDAL.Get(id);
        }

        public async Task<JsonResult> GetAll(int? id = null, string? firstname = null, string? lastname = null, string? gender = null, string? dob = null, string? oderby_value = null, int? pagenumber = null, int? pagesize = null)
        {
            return await _patientDemographicsDAL.GetAll(id, firstname,lastname, gender,dob, oderby_value, pagenumber ,pagesize);
        }

        public async Task<JsonResult> InsertData(PatientDemographicsModel pt)
        {
            return await _patientDemographicsDAL.InsertData(pt);
        }

        public async Task<JsonResult> UpdateData(int id, PatientDemographicsModel pt)
        {
            return await _patientDemographicsDAL.UpdateData(id, pt);
        }
    }
}
