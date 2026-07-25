using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Gym_Managament_API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
            => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add(AttendanceDTO dto)
        {
            await _service.AddAsync(dto);
            return Ok("Attendance Added Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AttendanceDTO dto)
        {
            await _service.UpdateAsync(id, dto);
            return Ok("Attendance Updated Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Attendance Deleted Successfully");
        }
    }
}