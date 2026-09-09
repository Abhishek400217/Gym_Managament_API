const firstNames = [
  'Rohan', 'Priya', 'Amit', 'Sneha', 'Karan', 'Neha', 'Vikram', 'Ananya', 'Arjun', 'Divya',
  'Rahul', 'Pooja', 'Siddharth', 'Kavya', 'Aditya', 'Ishita', 'Varun', 'Meera', 'Nikhil', 'Tanvi',
  'Manish', 'Ritu', 'Sameer', 'Anjali', 'Rajesh', 'Swati', 'Gaurav', 'Nisha', 'Abhishek', 'Priyanka',
  'Yash', 'Simran', 'Harsh', 'Radhika', 'Naveen', 'Bhavna', 'Suresh', 'Komal', 'Deepak', 'Alisha',
]

const lastNames = [
  'Mehta', 'Singh', 'Verma', 'Kulkarni', 'Shah', 'Joshi', 'Rao', 'Iyer', 'Patel', 'Sharma',
  'Gupta', 'Nair', 'Reddy', 'Malhotra', 'Chopra', 'Bhatt', 'Desai', 'Pillai', 'Agarwal', 'Kapoor',
]

const durationOptions = [
  { label: '1 Month', days: 30, fee: 1500 },
  { label: '3 Months', days: 90, fee: 4000 },
  { label: '6 Months', days: 180, fee: 7500 },
  { label: '1 Year', days: 365, fee: 14000 },
]

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const today = new Date()

// Deterministically generated dummy roster — no backend, no per-render randomness. 48 members gives the
// infinite-scroll list something real to paginate through (4 loads of 12 at PAGE_SIZE=12).
export const allMembers = Array.from({ length: 48 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length]
  const lastName = lastNames[(i * 3 + 5) % lastNames.length]
  const name = `${firstName} ${lastName}`
  const gender = i % 5 === 0 ? 'Other' : i % 2 === 0 ? 'Male' : 'Female'
  const duration = durationOptions[i % durationOptions.length]

  const joinDate = addDays(today, -((i * 23) % 400))
  const expiryDate = addDays(joinDate, duration.days)
  const daysToExpiry = Math.round((expiryDate - today) / (1000 * 60 * 60 * 24))
  const daysSinceJoin = Math.round((today - joinDate) / (1000 * 60 * 60 * 24))

  let paymentStatus = 'Paid'
  if (daysToExpiry < 0) paymentStatus = 'Overdue'
  else if (daysToExpiry <= 5) paymentStatus = 'Pending'

  return {
    id: `mem-${i + 1}`,
    memberId: `PF-${String(1000 + i)}`,
    name,
    mobile: `+91 9${String(800000000 + i * 91827).padStart(9, '0').slice(0, 9)}`,
    gender,
    membershipDuration: duration.label,
    membershipFee: duration.fee,
    joinDate: formatDate(joinDate),
    expiryDate: formatDate(expiryDate),
    paymentStatus,
    isExpiringSoon: daysToExpiry >= 0 && daysToExpiry <= 5,
    isPendingPayment: paymentStatus === 'Pending' || paymentStatus === 'Overdue',
    isNewMember: daysSinceJoin >= 0 && daysSinceJoin <= 10,
    isBirthdayThisWeek: i % 11 === 0,
  }
})