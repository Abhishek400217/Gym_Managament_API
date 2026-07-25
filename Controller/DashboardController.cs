using Gym_Managament_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Managament_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        public DashboardController(IDashboardService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            return Ok(await _service.GetDashboardAsync());
        }
    }
}