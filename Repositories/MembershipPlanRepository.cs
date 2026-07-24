using Gym_Managament_API.Data;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Repositories
{
    public class MembershipPlanRepository : IMembershipPlanRepository
    {
        private readonly ApplicationDbContext _context;

        public MembershipPlanRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<MembershipPlan>> GetAllAsync()
        {
            return await _context.MembershipPlans.ToListAsync();
        }

        public async Task<MembershipPlan?> GetByIdAsync(int id)
        {
            return await _context.MembershipPlans.FindAsync(id);
        }

        public async Task AddAsync(MembershipPlan plan)
        {
            await _context.MembershipPlans.AddAsync(plan);
            await _context.SaveChangesAsync();
        }
    }
}