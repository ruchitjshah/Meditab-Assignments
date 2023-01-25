namespace WebApplication1.Models
{
    public class PatientDemographicsModelList
    {
        public List<PatientDemographicsModelResponse>? PatientDemographics { get; set; }
    }
    public class PatientDemographicsModelResponse
    {

        public string? chartnumber { get; set; } = null;

        public string? firstname { get; set; } = null;

        public string? middlename { get; set; } = null;

        public string? lastname { get; set; } = null;

        public DateTime? dob { get; set; } = null;

        public int? gender_id { get; set; } = null;
    }

    public class PatientDemographicsModelRequest
    {
        public int? patient_id { get; set; } = null;

        public string? firstname { get; set; } = null;

        public string? lastname { get; set; } = null;

        public DateTime? dob { get; set; } = null;

        public int? gender_id { get; set; } = null;

        public int? pagenumber { get; set; } = null;

        public int? pagesize { get; set; } = null;

        public string? orderby { get; set; } = null;

        public string? sortmethod { get; set; } = null;
    }
}
