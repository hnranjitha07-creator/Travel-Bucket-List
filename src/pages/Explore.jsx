import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

const categories = ['All places', 'Adventure', 'Beach', 'Mountain', 'Cultural', 'Nature']

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || 'All places')
  const { savedIds, onToggleSave } = useOutletContext()

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase()
    return destinations.filter((place) => {
      const matchesText = !text || `${place.name} ${place.country} ${place.description} ${place.category}`.toLowerCase().includes(text)
      const matchesCategory = category === 'All places' || place.category === category
      return matchesText && matchesCategory
    })
  }, [category, query])

  const updateCategory = (nextCategory) => {
    setCategory(nextCategory)
    const nextParams = new URLSearchParams(params)
    if (nextCategory === 'All places') nextParams.delete('category')
    else nextParams.set('category', nextCategory)
    setParams(nextParams, { replace: true })
  }

  return (
    <main className="inner-page">
      <section className="page-intro">
        <span className="section-kicker">A WORLD OF POSSIBILITIES</span>
        <h1>Find your <em>somewhere.</em></h1>
        <p>From faraway coastlines to a quiet mountain path. Start wherever you like.</p>
      </section>
      <section className="explore-content">
        <div className="explore-toolbar">
          <label className="explore-search"><Search size={19} /><input value={query} onChange={(event) => { setQuery(event.target.value); setParams((current) => { const next = new URLSearchParams(current); if (event.target.value) next.set('search', event.target.value); else next.delete('search'); return next }, { replace: true }) }} placeholder="Search a place, country, or feeling..." aria-label="Search destinations" /></label>
          <span className="explore-count"><SlidersHorizontal size={15} /> {filtered.length} {filtered.length === 1 ? 'place' : 'places'}</span>
        </div>
        <div className="category-tabs" aria-label="Destination categories">
          {categories.map((item) => <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => updateCategory(item)}>{item}</button>)}
        </div>
        {filtered.length
          ? <div className="destination-grid">{filtered.map((place) => <DestinationCard key={place.id} place={place} saved={savedIds.includes(place.id)} onToggleSave={onToggleSave} />)}</div>
          : <div className="empty-panel"><span>Nothing just yet.</span><p>Try a different search or category and see what finds you.</p><button className="button button-outline" onClick={() => { setQuery(''); updateCategory('All places') }}>Clear filters</button></div>}
      </section>
    </main>
  )
}
