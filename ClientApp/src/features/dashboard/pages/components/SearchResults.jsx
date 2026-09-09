import { Search } from 'lucide-react'
import styles from './SearchResults.module.css'

const categories = ['Members', 'Payments', 'Membership Plans', 'Attendance', 'Reports']

function SearchResults({ query }) {
  if (!query.trim()) return null
  const normalizedQuery = query.trim().toLowerCase()
  const matches = categories.filter((category) => category.toLowerCase().includes(normalizedQuery) || normalizedQuery.includes(category.split(' ')[0].toLowerCase()))

  return (
    <section className={styles.results} aria-live="polite">
      <Search size={15} aria-hidden="true" />
      <span>{matches.length ? `Showing ${matches.join(', ')}` : `No dashboard sections match “${query}”`}</span>
    </section>
  )
}

export default SearchResults
