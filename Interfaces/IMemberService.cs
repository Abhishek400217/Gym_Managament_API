using Gym_Managament_API.DTOs;
using Gym_Managament_API.Models;

namespace Gym_Managament_API.Interfaces
{
    public interface IMemberService
    {
        Task<List<Member>> GetAllAsync();
        Task<Member?> GetByIdAsync(int id);
        Task AddAsync(MemberDTO dto);
        Task UpdateAsync(int id, MemberDTO dto);
        Task DeleteAsync(int id);
    }
}