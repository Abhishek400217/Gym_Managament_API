import { useCallback, useEffect, useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import AppShell from '../../../components/layoout/AppShell'
import MembersToolbar from '../components/MembersToolbar'
import MembersTable from '../components/MembersTable'
import MemberCard from '../components/MemberCard'
import MembersTableSkeleton from '../components/MembersTableSkeleton'
import EmptyState from '../../../components/common/EmptyState'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { allMembers } from '../../../data/membersData'
import styles from './MembersPage.module.css'

const PAGE_SIZE = 12
const INITIAL_LOAD_DELAY = 650
const NEXT_PAGE_DELAY = 500

function MembersPage() {
  const isMobile = useMediaQuery('(max-width: 860px)')

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebouncedValue(searchTerm, 250)

  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Simulated initial fetch — no backend, but a real load still takes a moment, and it gives the skeleton
  // something to justify.
  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), INITIAL_LOAD_DELAY)
    return () => clearTimeout(timeout)
  }, [])

  const filteredMembers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    if (!query) return allMembers
    const normalizedQuery = query.replace(/\s/g, '')
    return allMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.mobile.replace(/\s/g, '').includes(normalizedQuery) ||
        member.memberId.toLowerCase().includes(query)
    )
  }, [debouncedSearch])

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
    console.log('Member action:', actionId, member.id)
  }

  const handleAddMember = () => {
    console.log('Open add member flow')
  }

  const showTrueEmptyState = !initialLoading && allMembers.length === 0
  const showNoResultsState = !initialLoading && allMembers.length > 0 && filteredMembers.length === 0

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
    </AppShell>
  )
}

export default MembersPage