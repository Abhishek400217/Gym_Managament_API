using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym_Managament_API.Models
{
    public class MembershipPlan
    {
        [Key]
        public int PlanId { get; set; }

        [Required]
        [MaxLength(50)]
        public string PlanName { get; set; } = string.Empty;

        [Required]
        public int DurationInMonths { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [MaxLength(200)]
        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
    }
}