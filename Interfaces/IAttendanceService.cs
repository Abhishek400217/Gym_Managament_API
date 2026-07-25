using Gym_Managament_API.DTOs;

namespace Gym_Managament_API.Interfaces
{
    public interface IAttendanceService
    {
        Task<IEnumerable<AttendanceDTO>> GetAllAsync();
        Task<AttendanceDTO?> GetByIdAsync(int id);
        Task AddAsync(AttendanceDTO dto);
        Task UpdateAsync(int id, AttendanceDTO dto);
        Task DeleteAsync(int id);
    }
}