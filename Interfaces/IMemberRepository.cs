using Gym_Managament_API.Models;

namespace Gym_Managament_API.Interfaces
{
    public interface IMemberRepository
    {
        Task<List<Member>> GetAllAsync();
        Task<Member?> GetByIdAsync(int id);
        Task AddAsync(Member member);
        Task UpdateAsync(Member member);
        Task DeleteAsync(Member member);
    }
}