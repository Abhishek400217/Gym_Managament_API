using Gym_Managament_API.Data;
using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ApplicationDbContext _context;

        public DashboardService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DashboardDTO> GetDashboardAsync()
        {
            return new DashboardDTO
            {
                TotalMembers = await _context.Members.CountAsync(),

                TotalMembershipPlans = await _context.MembershipPlans.CountAsync(),

                TodayAttendance = await _context.Attendances.CountAsync(x =>
                    x.AttendanceDate.Date == DateTime.Today),

                PendingPayments = await _context.Payments.CountAsync(x =>
                    x.Status == "Pending")
            };
        }
    }
}