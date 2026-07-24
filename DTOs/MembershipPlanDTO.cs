using System.ComponentModel.DataAnnotations;

namespace Gym_Managament_API.DTOs
{
    public class MembershipPlanDTO
    {
        [Required]
        [MaxLength(50)]
        public string PlanName { get; set; } = string.Empty;

        [Required]
        public int DurationInMonths { get; set; }

        public decimal Price { get; set; }

        public string? Description { get; set; }
    }
}