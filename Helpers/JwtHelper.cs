using System.IdentityModel.Tokens.Jwt;

namespace Gym_Managament_API.Helpers
{
    public class JwtHelper
    {
        public static string WriteToken(JwtSecurityToken token)
        {
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}