import { formatDurationLabel } from '../utils/planOrdering'

// Dummy seed data only — no backend. PlansProvider copies this into React state on first load; every
// add/edit/delete after that only mutates in-memory state (no localStorage), per spec.
const seedPlans = [
    { months: 1, price: 1500, memberCount: 142 },
    { months: 2, price: 2800, memberCount: 38 },
    { months: 3, price: 4000, memberCount: 96 },
    { months: 4, price: 5200, memberCount: 21 },
    { months: 6, price: 7000, memberCount: 64 },
    { months: 12, price: 12000, memberCount: 58 },
    { months: 5, price: 4500, memberCount: 0 },
]

export const initialPlans = seedPlans.map((plan, index) => ({
    id: `plan-${index + 1}`,
    months: plan.months,
    name: formatDurationLabel(plan.months),
    price: plan.price,
    description: `Valid for ${formatDurationLabel(plan.months)}`,
    memberCount: plan.memberCount,
}))