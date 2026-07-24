using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;

namespace Gym_Managament_API.Services
{
    public class MembershipPlanService : IMembershipPlanService
    {
        private readonly IMembershipPlanRepository _repository;

        public MembershipPlanService(IMembershipPlanRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<MembershipPlan>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<MembershipPlan?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(MembershipPlanDTO dto)
        {
            var plan = new MembershipPlan
            {
                PlanName = dto.PlanName,
                DurationInMonths = dto.DurationInMonths,
                Price = dto.Price,
                Description = dto.Description
            };

            await _repository.AddAsync(plan);
        }
    }
}