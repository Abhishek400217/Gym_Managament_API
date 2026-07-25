using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;

namespace Gym_Managament_API.Services
{
    public class AttendanceService : IAttendanceService
    {
        private readonly IAttendanceRepository _repository;

        public AttendanceService(IAttendanceRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<AttendanceDTO>> GetAllAsync()
            => _repository.GetAllAsync();

        public Task<AttendanceDTO?> GetByIdAsync(int id)
            => _repository.GetByIdAsync(id);

        public Task AddAsync(AttendanceDTO dto)
            => _repository.AddAsync(dto);

        public Task UpdateAsync(int id, AttendanceDTO dto)
            => _repository.UpdateAsync(id, dto);

        public Task DeleteAsync(int id)
            => _repository.DeleteAsync(id);
    }
}