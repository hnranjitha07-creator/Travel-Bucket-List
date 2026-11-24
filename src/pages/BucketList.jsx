import { Heart, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

export default function BucketList() {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All countries')
  const { savedIds, visitedIds, onToggleSave, onToggleVisited } = useOutletContext()
  const savedPlaces = useMemo(() => destinations.filter((place) => savedIds.includes(place.id)), [savedIds])
  const countries = [...new Set(savedPlaces.map((place) => place.country))].sort()
  const visiblePlaces = useMemo(() => savedPlaces.filter((place) => {
    const text = `${place.name} ${place.country}`.toLowerCase()
    return text.includes(query.trim().toLowerCase()) && (country === 'All countries' || place.country === country)
  }), [country, query, savedPlaces])

  return (
    <main className="inner-page">
      <section className="page-intro bucket-intro">
        <span className="section-kicker">ALL THE PLACES YOU KEEP THINKING ABOUT</span>
        <h1>My bucket <em>list.</em></h1>
        <p>{savedPlaces.length} {savedPlaces.length === 1 ? 'place' : 'places'} saved for your someday. There’s no rush.</p>
        <Link className="button button-green" to="/explore">Find another place <span>↗</span></Link>
      </section>
      {savedPlaces.length > 0 && <>
        <div className="bucket-toolbar">
          <label className="explore-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your saved places..." aria-label="Search saved places" /></label>
          <label className="country-select">Country <select value={country} onChange={(event) => setCountry(event.target.value)}><option>All countries</option>{countries.map((name) => <option key={name}>{name}</option>)}</select></label>
          <span className="bucket-total"><Heart size={15} /> {savedPlaces.length} saved</span>
        </div>
        {visiblePlaces.length
          ? <div className="destination-grid bucket-grid">{visiblePlaces.map((place) => <div className="bucket-place" key={place.id}><DestinationCard place={place} saved onToggleSave={onToggleSave} /><button className={`visited-toggle${visitedIds.includes(place.id) ? ' is-visited' : ''}`} onClick={() => onToggleVisited(place.id)}>{visitedIds.includes(place.id) ? '✓ Been there' : '○ Mark as visited'}</button></div>)}</div>
          : <div className="empty-panel"><span>No saved places match.</span><p>Try a different search or country.</p><button className="button button-outline" onClick={() => { setQuery(''); setCountry('All countries') }}>Clear filters</button></div>}
      </>}
      {savedPlaces.length === 0 && <div className="empty-panel bucket-empty"><span>Your next favorite place is out there.</span><p>Save a destination and we’ll keep it safe here until you’re ready.</p><Link className="button button-green" to="/explore">Explore destinations <span>↗</span></Link></div>}
    </main>
  )
}
