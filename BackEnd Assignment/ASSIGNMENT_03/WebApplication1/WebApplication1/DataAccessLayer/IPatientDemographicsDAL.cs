﻿using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

namespace WebApplication1.DataAccessLayer
{
    public interface IPatientDemographicsDAL
    {
        public Task<PatientDemographicsModelList> Get(int id);
        public Task<PatientDemographicsModelList> GetFilterData(PatientDemographicsModelRequest request);

        public Task<int> InsertData(PatientDemographicsModelResponse pt);

        public Task<int> UpdateData(int id, PatientDemographicsModelResponse pt);

        public Task<string> DeleteUser(int id);
    }
}
