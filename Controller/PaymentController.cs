using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Gym_Managament_API.Controllers
{
    [Authorize]

    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _service;

        public PaymentController(IPaymentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _service.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add(PaymentDTO dto)
        {
            await _service.AddAsync(dto);
            return Ok("Payment Added Successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PaymentDTO dto)
        {
            await _service.UpdateAsync(id, dto);
            return Ok("Payment Updated Successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return Ok("Payment Deleted Successfully");
        }
    }
}