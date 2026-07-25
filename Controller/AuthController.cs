using Gym_Managament_API.Data;
using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;

        public AuthController(ApplicationDbContext context,
                              IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(x =>
                x.Username == dto.Username &&
                x.Password == dto.Password);

            if (admin == null)
                return Unauthorized("Invalid Username or Password");

            var token = _jwtService.GenerateToken(admin);

            return Ok(new LoginResponseDTO
            {
                Token = token,
                Role = "Admin",
                Message = "Login Successful"
            });
        }
    }
}