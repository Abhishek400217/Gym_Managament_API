import { useEffect, useState } from 'react'

// Simple client-side pagination over an already-filtered array. Resets to page 1 whenever the item count
// changes (a new search/filter narrows the list) so users don't land on an empty page 4 of 1.
export function usePagination(items, pageSize = 8) {
    const [page, setPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

    useEffect(() => {
        setPage(1)
    }, [items.length])

    const pageItems = items.slice((page - 1) * pageSize, page * pageSize)

    return { page, setPage, totalPages, pageItems }
}