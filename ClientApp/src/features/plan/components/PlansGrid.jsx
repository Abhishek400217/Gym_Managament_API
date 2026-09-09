import PlanCard from './PlanCard'
import { sortPlansForDisplay } from '../../../utils/planOrdering'
import styles from './PlansGrid.module.css'

// Pure layout — orders plans (1,2,3,4,6,12, then Custom) and renders one PlanCard each with a stagger delay.
function PlansGrid({ plans, onEdit, onDelete }) {
    const ordered = sortPlansForDisplay(plans)

    return (
        <div className={styles.grid}>
            {ordered.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} index={index} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default PlansGrid