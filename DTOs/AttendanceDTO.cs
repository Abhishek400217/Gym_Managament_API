namespace Gym_Managament_API.DTOs
{
    public class AttendanceDTO
    {
        public int MemberId { get; set; }

        public DateTime AttendanceDate { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}