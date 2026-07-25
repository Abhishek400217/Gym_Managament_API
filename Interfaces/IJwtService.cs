using Gym_Managament_API.Models;

namespace Gym_Managament_API.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(Admin admin);
    }
}