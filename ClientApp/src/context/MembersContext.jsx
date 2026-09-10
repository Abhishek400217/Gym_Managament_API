import { createContext, useContext, useMemo, useState } from 'react'
import { allMembers as initialMembers } from '../data/membersData'

const MembersContext = createContext(null)

// Single source of truth for members — wraps the static allMembers array in React state
// so Add/Edit/Delete actions are reflected everywhere without a page reload.
export function MembersProvider({ children }) {
    const [members, setMembers] = useState(initialMembers)

    const addMember = (memberData) => {
        const newMember = {
            id: `mem-${Date.now()}`,
            memberId: `PF-${String(2000 + members.length)}`,
            paymentStatus: 'Paid',
            isExpiringSoon: false,
            isPendingPayment: false,
            isNewMember: true,
            isBirthdayThisWeek: false,
            ...memberData,
        }
        setMembers((prev) => [newMember, ...prev])
        return { success: true, member: newMember }
    }

    const updateMember = (id, updates) => {
        setMembers((prev) =>
            prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        )
        return { success: true }
    }

    const deleteMember = (id) => {
        setMembers((prev) => prev.filter((m) => m.id !== id))
        return { success: true }
    }

    const value = useMemo(
        () => ({ members, addMember, updateMember, deleteMember }),
        [members]
    )

    return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
}

export function useMembers() {
    const context = useContext(MembersContext)
    if (!context) throw new Error('useMembers must be used within a MembersProvider')
    return context
}
