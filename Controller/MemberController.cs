using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Managament_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _service;

        public MemberController(IMemberService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var members = await _service.GetAllAsync();
            return Ok(members);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var member = await _service.GetByIdAsync(id);

            if (member == null)
                return NotFound();

            return Ok(member);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MemberDTO dto)
        {
            await _service.AddAsync(dto);
            return Ok("Member Added Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MemberDTO dto)
        {
            await _service.UpdateAsync(id, dto);
            return Ok("Member Updated Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Member Deleted Successfully");
        }
    }
}