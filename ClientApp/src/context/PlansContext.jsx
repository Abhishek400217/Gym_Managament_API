import { createContext, useContext, useMemo, useState } from 'react'
import { initialPlans } from '../data/plansData'
import { formatDurationLabel } from '../utils/planOrdering'

const PlansContext = createContext(null)

// Single source of truth for membership plans across the whole app — the Members module's future "Add
// Member" plan dropdown reads from here too (via usePlans()), so no page ever hardcodes its own plan list.
// State is in-memory only per spec, so it resets on a full page reload.
export function PlansProvider({ children }) {
    const [plans, setPlans] = useState(initialPlans)

    const addPlan = ({ months, price, description }) => {
        const conflict = plans.some((p) => p.months === months)
        if (conflict) {
            return { success: false, error: `A plan for ${formatDurationLabel(months)} already exists.` }
        }
        const newPlan = {
            id: `plan-${Date.now()}`,
            months,
            name: formatDurationLabel(months),
            price,
            description: description?.trim() || `Valid for ${formatDurationLabel(months)}`,
            memberCount: 0,
        }
        setPlans((prev) => [...prev, newPlan])
        return { success: true }
    }

    const updatePlan = (id, { months, price, description }) => {
        const conflict = plans.some((p) => p.months === months && p.id !== id)
        if (conflict) {
            return { success: false, error: `A plan for ${formatDurationLabel(months)} already exists.` }
        }
        setPlans((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        months,
                        name: formatDurationLabel(months),
                        price,
                        description: description?.trim() || `Valid for ${formatDurationLabel(months)}`,
                    }
                    : p
            )
        )
        return { success: true }
    }

    const deletePlan = (id) => {
        const plan = plans.find((p) => p.id === id)
        if (!plan) return { success: false, error: 'Plan not found.' }
        if (plan.memberCount > 0) {
            return { success: false, error: 'This plan is currently assigned to members and cannot be deleted.' }
        }
        setPlans((prev) => prev.filter((p) => p.id !== id))
        return { success: true }
    }

    const value = useMemo(() => ({ plans, addPlan, updatePlan, deletePlan }), [plans])

    return <PlansContext.Provider value={value}>{children}</PlansContext.Provider>
}

export function usePlans() {
    const context = useContext(PlansContext)
    if (!context) throw new Error('usePlans must be used within a PlansProvider')
    return context
}