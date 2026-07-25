using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gym_Managament_API.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        public int MemberId { get; set; }

        [ForeignKey("MemberId")]
        public Member Member { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        public DateTime LastPaymentDate { get; set; }

        public DateTime NextDueDate { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = string.Empty;
    }
}