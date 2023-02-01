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

        public async Task<dynamic> Get(int id)
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

        public async Task<int> UploadImage(PatientDemographicsModelImageUpload files)
        {
            int id = 0;
            if (files != null)
            {
                if (files.image != null)
                {
                    string filename = "PatientProfile" + files.patient_id.ToString() + Path.GetExtension(files.image.FileName);
                    string filepath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\patientimages", filename);
                    var stream = new FileStream(filepath, FileMode.Create);
                    await files.image.CopyToAsync(stream);
                    Console.WriteLine(filename);
                    Console.WriteLine(files.patient_id.ToString());
                    stream.Close();
                }
                else
                {
                    Console.WriteLine("Im ruchit");
                }
            }
            else
            {
                Console.WriteLine("Hello");
            }

            return await Task.FromResult(id);
        }
    }
}
