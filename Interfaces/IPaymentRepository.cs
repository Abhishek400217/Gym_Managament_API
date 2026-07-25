using Gym_Managament_API.DTOs;

namespace Gym_Managament_API.Interfaces
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<PaymentDTO>> GetAllAsync();
        Task<PaymentDTO?> GetByIdAsync(int id);
        Task AddAsync(PaymentDTO dto);
        Task UpdateAsync(int id, PaymentDTO dto);
        Task DeleteAsync(int id);
    }
}