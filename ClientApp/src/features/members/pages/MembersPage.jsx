import { useCallback, useEffect, useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import MembersToolbar from '../components/MembersToolbar'
import MembersTable from '../components/MembersTable'
import MemberCard from '../components/MemberCard'
import MembersTableSkeleton from '../components/MembersTableSkeleton'
import MemberFormDrawer from '../components/MemberFormDrawer'
import MemberViewDrawer from '../components/MemberViewDrawer'
import MemberRenewDrawer from '../components/MemberRenewDrawer'
import EmptyState from '../../../components/common/EmptyState'
import ConfirmDialog from '../../../components/common/ConfirmDialog'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useMembers } from '../../../context/MembersContext'
import styles from './MembersPage.module.css'

const PAGE_SIZE = 12
const INITIAL_LOAD_DELAY = 650
const NEXT_PAGE_DELAY = 500

function MembersPage() {
  const isMobile = useMediaQuery('(max-width: 860px)')
  const { members, deleteMember } = useMembers()

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebouncedValue(searchTerm, 250)

  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Drawer / modal state
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [viewingMember, setViewingMember] = useState(null)
  const [renewingMember, setRenewingMember] = useState(null)
  const [renewMode, setRenewMode] = useState('renew')
  const [deletingMember, setDeletingMember] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), INITIAL_LOAD_DELAY)
    return () => clearTimeout(timeout)
  }, [])

  const filteredMembers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    if (!query) return members
    const normalizedQuery = query.replace(/\s/g, '')
    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.mobile.replace(/\s/g, '').includes(normalizedQuery) ||
        member.memberId.toLowerCase().includes(query)
    )
  }, [debouncedSearch, members])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [debouncedSearch])

  const visibleMembers = filteredMembers.slice(0, visibleCount)
  const hasMore = visibleCount < filteredMembers.length

  const loadMore = useCallback(() => {
    setLoadingMore(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredMembers.length))
      setLoadingMore(false)
    }, NEXT_PAGE_DELAY)
  }, [filteredMembers.length])

  const sentinelRef = useInfiniteScroll({ hasMore, loading: loadingMore, onIntersect: loadMore })

  const handleAction = (actionId, member) => {
    switch (actionId) {
      case 'view':
        setViewingMember(member)
        break
      case 'edit':
        setEditingMember(member)
        break
      case 'renew':
        setRenewMode('renew')
        setRenewingMember(member)
        break
      case 'upgrade':
        setRenewMode('upgrade')
        setRenewingMember(member)
        break
      case 'delete':
        setDeletingMember(member)
        break
      default:
        break
    }
  }

  const handleAddMember = () => setAddDrawerOpen(true)

  const handleConfirmDelete = () => {
    if (deletingMember) deleteMember(deletingMember.id)
    setDeletingMember(null)
  }

  const showTrueEmptyState = !initialLoading && members.length === 0
  const showNoResultsState = !initialLoading && members.length > 0 && filteredMembers.length === 0

  return (
    <AppShell>
      <div className={styles.page}>
        <MembersToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddMember={handleAddMember}
          resultCount={filteredMembers.length}
        />

        {initialLoading && <MembersTableSkeleton isMobile={isMobile} rows={6} />}

        {!initialLoading && showTrueEmptyState && (
          <EmptyState
            icon={UserPlus}
            headline="No Members Yet"
            subtext="Add your first member to get started."
            actionLabel="Add Member"
            onAction={handleAddMember}
          />
        )}

        {!initialLoading && showNoResultsState && (
          <EmptyState
            headline="No matches found"
            subtext={`Nothing matches "${debouncedSearch}". Try a different name, number, or member ID.`}
            actionLabel="Clear Search"
            onAction={() => setSearchTerm('')}
          />
        )}

        {!initialLoading && visibleMembers.length > 0 && (
          <>
            {isMobile ? (
              <div>
                {visibleMembers.map((member, index) => (
                  <MemberCard key={member.id} member={member} index={index} onAction={handleAction} />
                ))}
              </div>
            ) : (
              <MembersTable members={visibleMembers} onAction={handleAction} />
            )}

            {hasMore && (
              <div ref={sentinelRef} className={styles.sentinel}>
                {loadingMore && <MembersTableSkeleton isMobile={isMobile} rows={2} />}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Member Drawer */}
      <MemberFormDrawer
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        mode="add"
      />

      {/* Edit Member Drawer */}
      <MemberFormDrawer
        open={!!editingMember}
        onClose={() => setEditingMember(null)}
        mode="edit"
        member={editingMember}
      />

      {/* View Member Drawer */}
      <MemberViewDrawer
        open={!!viewingMember}
        onClose={() => setViewingMember(null)}
        member={viewingMember}
      />

      {/* Renew / Upgrade Drawer */}
      <MemberRenewDrawer
        open={!!renewingMember}
        onClose={() => setRenewingMember(null)}
        member={renewingMember}
        mode={renewMode}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={!!deletingMember}
        title="Delete this member?"
        message={deletingMember ? `This will permanently remove ${deletingMember.name} from your member list. This cannot be undone.` : ''}
        confirmLabel="Delete Member"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingMember(null)}
      />
    </AppShell>
  )
}

export default MembersPage
