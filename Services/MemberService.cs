using Gym_Managament_API.DTOs;
using Gym_Managament_API.Interfaces;
using Gym_Managament_API.Models;

namespace Gym_Managament_API.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _repository;

        public MemberService(IMemberRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Member>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Member?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(MemberDTO dto)
        {
            var member = new Member
            {
                FullName = dto.FullName,
                MobileNo = dto.MobileNo,
                Age = dto.Age,
                Gender = dto.Gender,
                JoinDate = dto.JoinDate,
                MembershipPlanId = dto.MembershipPlanId
            };

            await _repository.AddAsync(member);
        }

        public async Task UpdateAsync(int id, MemberDTO dto)
        {
            var member = await _repository.GetByIdAsync(id);

            if (member == null)
                throw new Exception("Member Not Found");

            member.FullName = dto.FullName;
            member.MobileNo = dto.MobileNo;
            member.Age = dto.Age;
            member.Gender = dto.Gender;
            member.JoinDate = dto.JoinDate;
            member.MembershipPlanId = dto.MembershipPlanId;

            await _repository.UpdateAsync(member);
        }

        public async Task DeleteAsync(int id)
        {
            var member = await _repository.GetByIdAsync(id);

            if (member == null)
                throw new Exception("Member Not Found");

            await _repository.DeleteAsync(member);
        }
    }
}