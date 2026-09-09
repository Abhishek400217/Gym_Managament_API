import { useState } from 'react'
import { Plus, Layers } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import PlansGrid from '../components/PlansGrid'
import PlanFormDrawer from '../components/PlanFormDrawer'
import EmptyState from '../../../components/common/EmptyState'
import ActionButton from '../../../components/common/ActionButton'
import { usePlans } from '../../../context/PlansContext'
import styles from './MembershipPlansPage.module.css'

function MembershipPlansPage() {
    const { plans, deletePlan } = usePlans()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [editingPlan, setEditingPlan] = useState(null)

    const openAddDrawer = () => {
        setEditingPlan(null)
        setDrawerOpen(true)
    }

    const openEditDrawer = (plan) => {
        setEditingPlan(plan)
        setDrawerOpen(true)
    }

    const closeDrawer = () => setDrawerOpen(false)

    return (
        <AppShell>
            <div className={styles.page}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Membership Plans</h1>
                        <p className={styles.subtitle}>Manage gym membership durations and pricing.</p>
                    </div>
                    <ActionButton icon={Plus} onClick={openAddDrawer}>Add Plan</ActionButton>
                </div>

                {plans.length === 0 ? (
                    <EmptyState
                        icon={Layers}
                        headline="No Plans Yet"
                        subtext="Add your first membership plan to get started."
                        actionLabel="Add Plan"
                        onAction={openAddDrawer}
                    />
                ) : (
                    <PlansGrid plans={plans} onEdit={openEditDrawer} onDelete={deletePlan} />
                )}
            </div>

            <PlanFormDrawer open={drawerOpen} onClose={closeDrawer} mode={editingPlan ? 'edit' : 'add'} plan={editingPlan} />
        </AppShell>
    )
}

export default MembershipPlansPage