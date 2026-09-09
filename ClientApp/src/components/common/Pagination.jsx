import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.css'

// Generic numbered pagination — no ellipsis truncation, since dummy-data scale never needs it; add that
// later if a module ever has enough pages to warrant it.
function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <nav className={styles.wrapper} aria-label="Pagination">
            <button type="button" className={styles.navButton} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">
                <ChevronLeft size={16} aria-hidden="true" />
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`${styles.pageButton} ${page === currentPage ? styles.pageButtonActive : ''}`}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button type="button" className={styles.navButton} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">
                <ChevronRight size={16} aria-hidden="true" />
            </button>
        </nav>
    )
}

export default Pagination