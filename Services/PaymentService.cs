using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;

namespace Gym_Managament_API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;

        public PaymentService(IPaymentRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<PaymentDTO>> GetAllAsync() => _repository.GetAllAsync();

        public Task<PaymentDTO?> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task AddAsync(PaymentDTO dto) => _repository.AddAsync(dto);

        public Task UpdateAsync(int id, PaymentDTO dto) => _repository.UpdateAsync(id, dto);

        public Task DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}