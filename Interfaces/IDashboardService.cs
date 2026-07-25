using Gym_Managament_API.DTOs;

namespace Gym_Managament_API.Interfaces
{
    public interface IDashboardService
    {
        Task<DashboardDTO> GetDashboardAsync();
    }
}