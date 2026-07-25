using Gym_Managament_API.Data;
using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Repositories
{
    public class AttendanceRepository : IAttendanceRepository
    {
        private readonly ApplicationDbContext _context;

        public AttendanceRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AttendanceDTO>> GetAllAsync()
        {
            return await _context.Attendances
                .Select(a => new AttendanceDTO
                {
                    MemberId = a.MemberId,
                    AttendanceDate = a.AttendanceDate,
                    Status = a.Status
                }).ToListAsync();
        }

        public async Task<AttendanceDTO?> GetByIdAsync(int id)
        {
            return await _context.Attendances
                .Where(a => a.AttendanceId == id)
                .Select(a => new AttendanceDTO
                {
                    MemberId = a.MemberId,
                    AttendanceDate = a.AttendanceDate,
                    Status = a.Status
                }).FirstOrDefaultAsync();
        }

        public async Task AddAsync(AttendanceDTO dto)
        {
            var attendance = new Attendance
            {
                MemberId = dto.MemberId,
                AttendanceDate = dto.AttendanceDate,
                Status = dto.Status
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, AttendanceDTO dto)
        {
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
                return;

            attendance.MemberId = dto.MemberId;
            attendance.AttendanceDate = dto.AttendanceDate;
            attendance.Status = dto.Status;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
                return;

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();
        }
    }
}