using Gym_Managament_API.Models;

namespace Gym_Managament_API.Interfaces
{
    public interface IMembershipPlanRepository
    {
        Task<List<MembershipPlan>> GetAllAsync();
        Task<MembershipPlan?> GetByIdAsync(int id);
        Task AddAsync(MembershipPlan plan);
    }
}