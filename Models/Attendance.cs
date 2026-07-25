using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym_Managament_API.Models
{
    public class Attendance
    {
        [Key]
        public int AttendanceId { get; set; }

        public int MemberId { get; set; }

        [ForeignKey("MemberId")]
        public Member Member { get; set; }

        public DateTime AttendanceDate { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = string.Empty;
    }
}