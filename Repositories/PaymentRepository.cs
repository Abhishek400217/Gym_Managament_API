using Gym_Managament_API.Data;
using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Managament_API.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _context;

        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PaymentDTO>> GetAllAsync()
        {
            return await _context.Payments
                .Select(x => new PaymentDTO
                {
                    MemberId = x.MemberId,
                    Amount = x.Amount,
                    LastPaymentDate = x.LastPaymentDate,
                    NextDueDate = x.NextDueDate,
                    Status = x.Status
                }).ToListAsync();
        }

        public async Task<PaymentDTO?> GetByIdAsync(int id)
        {
            return await _context.Payments
                .Where(x => x.PaymentId == id)
                .Select(x => new PaymentDTO
                {
                    MemberId = x.MemberId,
                    Amount = x.Amount,
                    LastPaymentDate = x.LastPaymentDate,
                    NextDueDate = x.NextDueDate,
                    Status = x.Status
                }).FirstOrDefaultAsync();
        }

        public async Task AddAsync(PaymentDTO dto)
        {
            _context.Payments.Add(new Payment
            {
                MemberId = dto.MemberId,
                Amount = dto.Amount,
                LastPaymentDate = dto.LastPaymentDate,
                NextDueDate = dto.NextDueDate,
                Status = dto.Status
            });

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, PaymentDTO dto)
        {
            var payment = await _context.Payments.FindAsync(id);

            if (payment == null) return;

            payment.MemberId = dto.MemberId;
            payment.Amount = dto.Amount;
            payment.LastPaymentDate = dto.LastPaymentDate;
            payment.NextDueDate = dto.NextDueDate;
            payment.Status = dto.Status;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var payment = await _context.Payments.FindAsync(id);

            if (payment == null) return;

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
        }
    }
}