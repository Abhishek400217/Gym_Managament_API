using Gym_Managament_API.DTOs;
using Gym_Managament_API.Models;

namespace Gym_Managament_API.Interfaces
{
    public interface IMembershipPlanService
    {
        Task<List<MembershipPlan>> GetAllAsync();
        Task<MembershipPlan?> GetByIdAsync(int id);
        Task AddAsync(MembershipPlanDTO dto);
    }
}