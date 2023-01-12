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

        public async Task<string> DeleteUser(int id)
        {
            return await _patientDemographicsDAL.DeleteUser(id);
        }

        public async Task<PatientDemographicsModelList> Get(int id)
        {
            return await _patientDemographicsDAL.Get(id);
        }

        public async Task<PatientDemographicsModelList> GetFilterData(PatientDemographicsModelRequest request)
        {
            return await _patientDemographicsDAL.GetFilterData(request);
        }

       
        public async Task<int> InsertData(PatientDemographicsModelResponse pt)
        {
            return await _patientDemographicsDAL.InsertData(pt);
        }

        public async Task<int> UpdateData(int id, PatientDemographicsModelResponse pt)
        {
            return await _patientDemographicsDAL.UpdateData(id, pt);
        }
    }
}
