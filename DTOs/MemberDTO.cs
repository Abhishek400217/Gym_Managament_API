namespace Gym_Managament_API.DTOs
{
    public class MemberDTO
    {
        public string FullName { get; set; } = string.Empty;

        public string MobileNo { get; set; } = string.Empty;

        public int Age { get; set; }

        public string Gender { get; set; } = string.Empty;

        public DateTime JoinDate { get; set; }

        public int MembershipPlanId { get; set; }
    }
}