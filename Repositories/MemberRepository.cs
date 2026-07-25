using Gym_Managament_API.Data;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Repositories
{
    public class MemberRepository : IMemberRepository
    {
        private readonly ApplicationDbContext _context;

        public MemberRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Member>> GetAllAsync()
        {
            return await _context.Members
                .Include(x => x.MembershipPlan)
                .ToListAsync();
        }

        public async Task<Member?> GetByIdAsync(int id)
        {
            return await _context.Members
                .Include(x => x.MembershipPlan)
                .FirstOrDefaultAsync(x => x.MemberId == id);
        }

        public async Task AddAsync(Member member)
        {
            await _context.Members.AddAsync(member);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Member member)
        {
            _context.Members.Update(member);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Member member)
        {
            _context.Members.Remove(member);
            await _context.SaveChangesAsync();
        }

    }
}