import { Eye, Pencil, RefreshCw, ArrowUpCircle, Trash2 } from 'lucide-react'
import Menu from '../../../components/common/Menu'

const ACTIONS = [
  { id: 'view', label: 'View', icon: Eye },
  { id: 'edit', label: 'Edit', icon: Pencil },
  { id: 'renew', label: 'Renew Membership', icon: RefreshCw },
  { id: 'upgrade', label: 'Upgrade Membership', icon: ArrowUpCircle },
  { id: 'delete', label: 'Delete', icon: Trash2, tone: 'danger' },
]

// Thin config wrapper around the generic Menu primitive — this file is the only place that knows what
// actions a member row supports.
function MemberActionsMenu({ member, onAction }) {
  return <Menu items={ACTIONS} onSelect={(actionId) => onAction?.(actionId, member)} />
}

export default MemberActionsMenu