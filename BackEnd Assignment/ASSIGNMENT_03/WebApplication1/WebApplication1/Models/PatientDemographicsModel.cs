namespace WebApplication1.Models
{
    public class PatientDemographicsModel
    {
        public int patient_id { get; }

        public string? chartnumber { get; }

        public string? firstname { get; set; }

        public string? middlename { get; set; }

        public string? lastname { get; set; }

        public DateTime dob { get; set; }

        public int gender_id { get; set; }

        public bool is_deleted { get; set; }
    }
}
