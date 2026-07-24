using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Managament_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipPlansController : ControllerBase
    {
        private readonly IMembershipPlanService _service;

        public MembershipPlansController(IMembershipPlanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _service.GetAllAsync();
            return Ok(plans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var plan = await _service.GetByIdAsync(id);

            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MembershipPlanDTO dto)
        {
            await _service.AddAsync(dto);
            return Ok("Membership Plan Added Successfully");
        }
    }
}