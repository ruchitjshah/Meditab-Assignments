namespace Assignment3API.Models
{
    public class PatientDemographicsMoodel
    {
        public int patient_id { get; set; }

        public string? chartnumber { get; set; }

        public string? firstname { get; set; }

        public string? middlename { get; set; }

        public string? lastname { get; set; }

        public DateTime dob { get; set; }

        public int gender_id { get; set; }


    }
}
