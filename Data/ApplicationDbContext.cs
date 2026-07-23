using Gym_Managament_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<MembershipPlan> MembershipPlans { get; set; }
    }
}