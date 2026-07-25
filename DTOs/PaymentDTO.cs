namespace Gym_Managament_API.DTOs
{
    public class PaymentDTO
    {
        public int MemberId { get; set; }

        public decimal Amount { get; set; }

        public DateTime LastPaymentDate { get; set; }

        public DateTime NextDueDate { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}